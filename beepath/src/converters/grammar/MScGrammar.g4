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
    : 'After ' endActivityExpression ', the process finishes.' ;

afterStatement
    : 'After ' endActivityExpression ', ' (immediatelyExpression | eventuallyExpression) '.';
andSubProcess
    : andSubProcessId ': ' activity ' and ' activity (' and ' activity)*? '.';
orSubProcess
    : orSubProcessId ': ' activity ' or ' activity (' or ' activity)*? '.';

immediatelyExpression
    : 'immediately ' (sequenceStartActivityExpression | andStartActivityExpression | orStartActivityExpression | repeatSinceStartActivityExpression);
eventuallyExpression
    : 'eventually ' sequenceStartActivityExpression;

sequenceStartActivityExpression
    : 'start ' activity;
andStartActivityExpression
    : 'start ' (activity | orSubProcessId) ' and start ' (activity | orSubProcessId) (' and start ' (activity | orSubProcessId))*? ;
orStartActivityExpression
    : 'either start ' (activity | andSubProcessId) ' or start ' (activity | andSubProcessId) (' or start ' (activity | andSubProcessId))*? ;
repeatSinceStartActivityExpression
    : 'repeat since ' activity (' or start ' (activity | andSubProcessId))*?;

endActivityExpression
    : (sequenceEndActivityExpression | andEndActivityExpression | orEndActivityExpression);

sequenceEndActivityExpression
    : activity ' ends';
andEndActivityExpression
    : (activity | orSubProcessId) ' ends and ' ((activity | orSubProcessId) ' ends and ')*? (activity | orSubProcessId) ' ends';
orEndActivityExpression
    : 'either ' (activity | andSubProcessId) ' ends or ' ((activity | andSubProcessId) ' ends or ')*? (activity | andSubProcessId) ' ends';

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
    : '\r'? '\n' ;