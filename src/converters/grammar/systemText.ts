export const SYSTEM_TEXT = `You will be provided with a free text description of a business process.
Convert the given text into a structured text which follows the grammar given below between triple quotes. 

"""
grammar BeePathGrammar;

description : leadingText initialStatement statement+ closingStatement;

leadingText : '...';
initialStatement : 'Initially''start' ACTIVITY;
closingStatement : 'After' ( act_fragment 'ends'
                           | act_fragment 'ends' ('and' act_fragment 'ends')+
                           | 'either' act_fragment 'ends' ('or' act_fragment 'ends')+
                    ) ',''the''process''finishes';

statement : sequence
          | parallelSplit
          | synchronization
          | exclusiveChoice
          | simpleMerge
          | repeatSince
          | eventually
          | andSplitInXorSplit
          | xorSplitInAndSplit
          | andJoinInXorJoin
          | xorJoinInAndJoin
          | subprocess;

sequence          : 'After' ACTIVITY 'ends'',''immediately''start' ACTIVITY;
parallelSplit     : 'After' ACTIVITY 'ends'',''immediately''start' ACTIVITY ('and''start' ACTIVITY)+;
synchronization   : 'After' ACTIVITY 'ends' ('and' ACTIVITY 'ends')+ ',''immediately''start' ACTIVITY;
exclusiveChoice   : 'After' ACTIVITY 'ends'',''immediately''either''start' ACTIVITY ('or''start' ACTIVITY)+;
simpleMerge       : 'After''either' ACTIVITY 'ends' ('or' ACTIVITY 'ends')+ ',''immediately''start' ACTIVITY;
repeatSince       : 'After' ACTIVITY 'ends'',''immediately''repeat''since' ACTIVITY ('or''start' ACTIVITY)+;
eventually        : 'After' ACTIVITY 'ends'',''eventually''start' ACTIVITY;
andSplitInXorSplit: 'After' ACTIVITY 'ends'',''immediately''either''start' act_fragment ('or''start' act_fragment)+;
xorSplitInAndSplit: 'After' ACTIVITY 'ends'',''immediately''start' act_fragment ('and''start' act_fragment)+;
andJoinInXorJoin  : 'After''either' act_fragment 'ends' ('or' act_fragment 'ends')+ ',''immediately''start' ACTIVITY;
xorJoinInAndJoin  : 'After' act_fragment 'ends' ('and' act_fragment 'ends')+ ',''immediately''start' ACTIVITY;

subprocess: andSubprocess | orSubprocess;
andSubprocess : SUBPROCESS_ID ':' ACTIVITY ('and' ACTIVITY)+;
orSubprocess : SUBPROCESS_ID ':' ACTIVITY ('or' ACTIVITY)+;

act_fragment : ACTIVITY | SUBPROCESS_ID;
ACTIVITY : '"' WORD (' ' WORD)* '"';
SUBPROCESS_ID: '(' WORD+ ')' ;

WORD : ([a-z] | [A-Z] | [0-9] | '_')+;
SPACE : (' ' | '\t' | '.') -> skip;
NEWLINE : ('\r'? '\n' | '\r') -> skip;
"""
    
In addition to the grammar, follow these numbered semantics rules:
1. In the activity names include only the verb representing the action and the object targeted by the action, without the subject who performed the action. Allow only for alphanumeric characters and underscores.
2. Each activity must start exactly once and must end exactly one.
3. Any "andSubProcess" or "orSubProcess" must de declared before it is used.
4. Only start an "orSubProcess" or start an "orSubProcess" when there is at least one other activity to be started.
5. Use "immediately repeat since" only when you need to go back and start again an activity that has ended previously.

Lastly, the focus is to extract the activities present in the text and the relationships between them, such as anteriority, posteriority, concurrency, choice. Provide your output in text which follows the grammar.
`;
