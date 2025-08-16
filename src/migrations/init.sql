-- MPEC Database Initialization Script
-- This file contains the database schema for the Mathematical Proof Explanatory Chain system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pattern_templates table
CREATE TABLE IF NOT EXISTS pattern_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    entities JSONB NOT NULL,
    relations JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_course_pattern FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create examples table (stores both examples and test questions)
CREATE TABLE IF NOT EXISTS examples (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('example', 'test')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pattern_instances table
CREATE TABLE IF NOT EXISTS pattern_instances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pattern_template_id UUID NOT NULL REFERENCES pattern_templates(id) ON DELETE CASCADE,
    example_id UUID NOT NULL REFERENCES examples(id) ON DELETE CASCADE,
    entities JSONB NOT NULL,
    relations JSONB NOT NULL,
    steps JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pattern_template FOREIGN KEY (pattern_template_id) REFERENCES pattern_templates(id),
    CONSTRAINT fk_example FOREIGN KEY (example_id) REFERENCES examples(id)
);

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    example_id UUID NOT NULL REFERENCES examples(id) ON DELETE CASCADE,
    pattern_instance_id UUID NOT NULL REFERENCES pattern_instances(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_example_answer FOREIGN KEY (example_id) REFERENCES examples(id),
    CONSTRAINT fk_pattern_instance_answer FOREIGN KEY (pattern_instance_id) REFERENCES pattern_instances(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_title ON courses(title);
CREATE INDEX IF NOT EXISTS idx_pattern_templates_course_id ON pattern_templates(course_id);
CREATE INDEX IF NOT EXISTS idx_examples_type ON examples(type);
CREATE INDEX IF NOT EXISTS idx_pattern_instances_pattern_template_id ON pattern_instances(pattern_template_id);
CREATE INDEX IF NOT EXISTS idx_pattern_instances_example_id ON pattern_instances(example_id);
CREATE INDEX IF NOT EXISTS idx_answers_example_id ON answers(example_id);
CREATE INDEX IF NOT EXISTS idx_answers_pattern_instance_id ON answers(pattern_instance_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for courses table
CREATE TRIGGER update_courses_updated_at 
    BEFORE UPDATE ON courses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO courses (title, content) VALUES (
    'Recursive Addition',
    '\section{Recursive Definition}
For non-negative integers \(a\) and \(b\):
\[
    a + b = \begin{cases}
        a                 & \text{if } b = 0 \\
        (a + (b - 1)) + 1 & \text{if } b > 0
    \end{cases}
\]'
) ON CONFLICT DO NOTHING;

-- Insert sample pattern template
INSERT INTO pattern_templates (course_id, name, entities, relations) 
SELECT 
    c.id,
    'Recursive Addition Pattern',
    '[
        {"id": "base_case", "name": "Base Case: a + 0 = a", "label": "Base Case", "type": "axiom", "start": true, "end": false},
        {"id": "recursive_def", "name": "Recursive Definition: a + b = (a + (b-1)) + 1", "label": "Recursive Rule", "type": "definition", "start": false, "end": false},
        {"id": "decomposition", "name": "Decomposition Step", "label": "Decompose Problem", "type": "step", "start": false, "end": false},
        {"id": "increment", "name": "Increment Operation: +1", "label": "Add One", "type": "operation", "start": false, "end": false},
        {"id": "final_result", "name": "Final Addition Result", "label": "Result", "type": "conclusion", "start": false, "end": true}
    ]'::jsonb,
    '[
        {"source": "base_case", "target": "recursive_def", "type": "grounds", "name": "provides foundation for"},
        {"source": "recursive_def", "target": "decomposition", "type": "enables", "name": "enables decomposition"},
        {"source": "decomposition", "target": "increment", "type": "requires", "name": "requires increment"},
        {"source": "increment", "target": "final_result", "type": "produces", "name": "produces result"}
    ]'::jsonb
FROM courses c 
WHERE c.title = 'Recursive Addition'
ON CONFLICT DO NOTHING;

-- Insert sample example
INSERT INTO examples (content, type) VALUES (
    '\section{Example: \( 3 + 2 \)}
\[
    \begin{aligned}
        3 + 2 & = (3 + 1) + 1 \\
              & = ((3 + 0) + 1) + 1 \\
              & = (3 + 1) + 1 \\
              & = 4 + 1 = 5
    \end{aligned}
\]',
    'example'
) ON CONFLICT DO NOTHING;

-- Grant permissions (adjust as needed for your setup)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mpec_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mpec_user;
