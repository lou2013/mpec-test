# What do improve
## Architecture
the architecture can be improved. some duplications can be reduced farther more than right now.
- maybe the interfaces should be moved to their own directories it should be decided on.    
- maybe typeorm use a datasource instead of returning the default as the datasource. 
- maybe entities should be in each module instead of a single directory. 
- maybe use the validation service? right now the validation is only done through dtos. 
## Code quality
- some codes are not as clean as they should be some things are hard coded maybe we could clean them up
- base crud service can actually be improved
- using index to export some datas always right now it is kinda incosistense
## Technical
- we can add cache layer on both apis and code level
- not using SerializeOptions on each api maybe a way to ignore that? (didnt have enough time to search for a fix i think it can be fixed)

## Core functionality
- some of the mocking logic is not that good maybe do a better job mocking them.(i didnt understand the logic which we mock and there were some inconsistency between interfaces and the pdf sent to me)