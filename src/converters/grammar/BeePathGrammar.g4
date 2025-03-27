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
