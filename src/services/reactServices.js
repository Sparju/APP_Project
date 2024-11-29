import http from '../common/Http'

export const getTopics=()=>{
    return http.get('/topics', {});
}

export const getInterviewQuestions=()=>{
    return http.get('/interviewQuestions', {});
}
const ReactPreparation={
    getTopics,
    getInterviewQuestions
}
export default ReactPreparation