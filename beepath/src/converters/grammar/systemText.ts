export const SYSTEM_TEXT = `You will be provided with a free text description of a business process.
Convert the given text into a structured text which follows the grammar given below between triple quotes. 

"""
grammar MScGrammar ;
description
    : leadingText statementList;

leadingText
    : 'The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.' (NEWLINE)*;

statementList
    : initialStatement (statement)*? closingStatement;
initialStatement
    : 'Initially start ' activity '.' (NEWLINE)*;
statement
    : (afterStatement | closingStatement | andSubProcess | orSubProcess) (NEWLINE)*;
closingStatement
    : (sequenceEndActivityExpression | andEndActivityExpression | orEndActivityExpression) ', the process finishes.' ;

afterStatement
    : (sequenceEndActivityExpression | andEndActivityExpression | orEndActivityExpression) ', ' (sequenceStartActivityExpression | andStartActivityExpression | orStartActivityExpression | repeatSinceStartActivityExpression | eventuallyExpression) '.';
andSubProcess
    : andSubProcessId ': ' activity ' and ' activity (' and ' activity)*? '.';
orSubProcess
    : orSubProcessId ': ' activity ' or ' activity (' or ' activity)*? '.';

sequenceStartActivityExpression
    : 'immediately start ' activity;
andStartActivityExpression
    : 'immediately start ' (activity | orSubProcessId) ' and start ' (activity | orSubProcessId) (' and start ' (activity | orSubProcessId))*? ;
orStartActivityExpression
    : 'immediately either start ' (activity | andSubProcessId) ' or start ' (activity | andSubProcessId) (' or start ' (activity | andSubProcessId))*? ;
repeatSinceStartActivityExpression
    : 'immediately repeat since ' activity (' or start ' (activity | andSubProcessId))*?;
eventuallyExpression
    : 'eventually start ' activity;

sequenceEndActivityExpression
    : 'After ' activity ' ends';
andEndActivityExpression
    : 'After ' (activity | orSubProcessId) ' ends and ' ((activity | orSubProcessId) ' ends and ')*? (activity | orSubProcessId) ' ends';
orEndActivityExpression
    : 'After either ' (activity | andSubProcessId) ' ends or ' ((activity | andSubProcessId) ' ends or ')*? (activity | andSubProcessId) ' ends';

activity
    : '"' WORD (SPACE WORD)*? '"' ;
andSubProcessId
    : '(' WORD (SPACE WORD)*? ')' ;
orSubProcessId
    : '(' WORD (SPACE WORD)*? ')' ;
WORD
    : [a-zA-Z0-9]+ ;
SPACE
    : ' ' | '_' ;
NEWLINE
    : '\r'? '\n' ;"""
    
In addition to the grammar, follow these numbered semantics rules:
1. In the activity names include only the verb representing the action and the object targeted by the action, without the subject who performed the action.
2. Each activity must start exactly once and must end exactly one.
3. Any "andSubProcess" or "orSubProcess" must de declared before it is used.
4. Only start an "orSubProcess" or start an "orSubProcess" when there is at least one other activity to be started.
5. Use "immediately repeat since" only when you need to go back and start again an activity that has ended previously.

Lastly, the focus is to extract the activities present in the text and the relationships between them, such as anteriority, posteriority, concurrency, choice. Provide your output in text which follows the grammar.
`;
