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
    : '_' ;
NEWLINE
    : '\r'? '\n' ;
"""


An example of textual description is the following:
"The process starts when the warehouse receives an order. After that, an employee picks all items from the order while another one sends the invoice. When both the picking and the invoicing are done, the manager closes the order. After the order is closed, the process finishes."

This should be converted into:
"""
The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.

Initially start "receive order".

After "receive order" ends, immediately start "pick items" and start "send invoice".
After "pick items" ends and "send invoice" ends, immediately start "close order".

Activity "send invoice" is performed by "crm".
Activity "pick items" is performed by "crm".
Activity "close order" is performed by "email system".

After "close order" ends, the process finishes.
"""

Another example of textual description is the following:
"The process starts when the female patient is examined by an outpatient physician, who decides whether she is healthy or needs to undertake an additional examination. In the former case, the physician fills out the examination form and the patient can leave. In the latter case, an examination and follow-up treatment order is placed by the physician, who additionally fills out a request form. Furthermore, the outpatient physician informs the patient about potential risks. If the patient signs an informed consent and agrees to continue with the procedure, a delegate of the physician arranges an appointment of the patient with one of the wards and updates the HIS selecting the first available slot. If the patient denies consent the process ends. Before the appointment, the required examination and sampling is prepared by a nurse of the ward based on the information provided by the outpatient section. Then, a ward physician takes the sample requested. He further sends it to the lab indicated in the request form and conducts the follow-up treatment of the patient. After receiving the sample, a physician of the lab validates its state and decides whether the sample can be used for analysis or whether it is contaminated and a new sample is required. After the analysis is performed by a medical technical assistant of the lab, a lab physician validates the results. Finally, a physician from the outpatient department makes the diagnosis and prescribes the therapy for the patient."

This should be converted into:
"""
The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.
Initially start "examine female patient".
(s1): "order examination with follow up treatment" and "fill out request form".
(s2): "conduct follow up treatment" and "diagnose with prescribe therapy".
After "examine female patient" ends, immediately either start "fill out examination form" or start (s1).
After "order examination with follow up treatment" ends and "fill out request form" ends, immediately start "inform patient about risks".
After "inform patient about risks" ends, immediately either start "sign consent" or start "deny consent".
After "sign consent" ends, immediately start "arrange appointment".
After "arrange appointment" ends, immediately start "update HIS selecting".
After "update HIS selecting" ends, eventually start "prepare sampling".
After "prepare sampling" ends, eventually start "take sample".
After "take sample" ends, immediately start "send sample to lab" and start "conduct follow up treatment".
After "send sample to lab" ends, immediately start "validate sample".
After "validate sample" ends, immediately repeat since "arrange appointment" or start "perform analysis".
After "perform analysis" ends, immediately start "validate results".
After "validate results" ends, immediately start "diagnose with prescribe therapy".
After either (s2) ends or "deny consent" ends or "fill out examination form" ends, the process finishes.
"""

    
In addition to the grammar, follow these numbered semantics rules:
1. In the activity names include only the verb representing the action and the object targeted by the action, without the subject who performed the action. Allow only for alphanumeric characters and underscores.
2. Each activity must start exactly once and must end exactly one.
3. Any "andSubProcess" or "orSubProcess" must de declared before it is used.
4. Only start an "orSubProcess" or start an "andSubProcess" when there is at least one other activity to be started.
5. Use "immediately repeat since" only when you need to go back and start again an activity that has ended previously.

Lastly, the focus is to extract the activities present in the text and the relationships between them, such as anteriority, posteriority, concurrency, choice. Provide your output in text which follows the grammar.
`;
