# Risk Management Process

```
The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.

Initially start "begin_risk_assessment".

(aaa): "identify_risk_owner" or "close_assessment_with_no_risks".

After "begin_risk_assessment" ends, immediately start "perform_impact_assessment" and start "declare_system_dependencies".
After "declare_system_dependencies" ends, immediately start "perform_likelihood_assessment".
After "perform_likelihood_assessment" ends and "perform_impact_assessment" ends, immediately start "risk_assessment_evaluation".
After "risk_assessment_evaluation" ends, immediately start (aaa) and start "schedule_new_risk_assessment_after_1_year".
After "identify_risk_owner" ends, immediately start "prepare_risk_treatment_plan".
After "prepare_risk_treatment_plan" ends, immediately start "present_risk_treatment_plan".
After "present_risk_treatment_plan" ends, immediately either start "approve_risk_plan" or start "reject_risk_plan".
After "reject_risk_plan" ends, immediately repeat since "prepare_risk_treatment_plan" or start "close_system_for_security_reasons".

After either "close_system_for_security_reasons" ends or "approve_risk_plan" ends, the process finishes.
```
