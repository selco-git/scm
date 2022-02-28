import React,{ useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import CitizenSurveyForm from "../../../components/Surveys/CitizenSurveyForm";
import { useQueryClient } from "react-query";
import { ActionBar, Card, SubmitBar, Menu,Loader } from "@egovernments/digit-ui-react-components";
import { format } from "date-fns";

const TypeAnswerEnum = {
  SHORT_ANSWER_TYPE: "Short Answer",
  LONG_ANSWER_TYPE: "Paragraph",
  MULTIPLE_ANSWER_TYPE: "Multiple Choice",
  CHECKBOX_ANSWER_TYPE: "Check Boxes",
  DATE_ANSWER_TYPE: "Date",
  TIME_ANSWER_TYPE: "Time",
};

const SurveyResults = () => {
   
    const params = useParams();
    const mutation = Digit.Hooks.survey.useShowResults()

    const queryClient = useQueryClient();
  
    useEffect(() => {
        const onSuccess = () => {
        queryClient.clear();
        };
        mutation.mutate({
        surveyId:params.id
        }, {
        onSuccess,
        });
    }, []);
    const tenantId = Digit.ULBService.getCurrentTenantId();

    const { isLoading, data: surveyData } = Digit.Hooks.survey.useSearch(
    { tenantIds: tenantId, uuid: params.id },
    {
      select: (data) => {
        const surveyObj = data?.Surveys?.[0];
        return {
          //tenantIds: { code: surveyObj.tenantId },
          uuid: surveyObj.uuid,
          title: surveyObj.title,
          description: surveyObj.description,
          collectCitizenInfo: { code: surveyObj.collectCitizenInfo },
          fromDate: format(new Date(surveyObj.startDate), "yyyy-MM-dd"),
          toDate: format(new Date(surveyObj.endDate), "yyyy-MM-dd"),
          fromTime: format(new Date(surveyObj.startDate), "hh:mm"),
          toTime: format(new Date(surveyObj.endDate), "hh:mm"),
          questions: surveyObj.questions.map(({ questionStatement, type, required, options, uuid, surveyId }) => ({
            questionStatement,
            type: TypeAnswerEnum[type],
            required,
            options,
            uuid,
            surveyId
          })),
          status: surveyObj.status,
        };
      },
    }
  );
    // if(surveyData) console.log(surveyData,"surveyData");
    // if(mutation.isSuccess) console.log(mutation.data,"mutation");
    console.log("mutation",mutation.data);
    console.log("surveyData",surveyData);
    if(isLoading || (mutation.isLoading && !mutation.isIdle)) return <Loader />
    if(mutation.isError) return <div>An error occured...</div>
   // if(!isLoading  && mutation.success) return <div>Data fetched success</div>
    // if (isLoading) return <Loader />;
    // else console.log(surveyData);

//   return <div>Hello World</div>
    // return <CitizenSurveyForm surveyData={surveyData} submitDisabled={true} formdisabled={true} formDefaultValues={{}} />

    // Need to display the Results view here.....
    // make a whoHasResponded component
    //make a separate component for each type of question -> this component will render the question as well as the response
    
    return(
        <div>
            Survey Results View
        </div>
    );
}

export default SurveyResults

