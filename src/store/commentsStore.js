import {create} from 'zustand'
import axios from 'axios'
import { getIdFromToken } from '../utils/getIdFromToken';
export const useCommentsStore = create((set,get) => ({
      comments: [],
      comment: '',
      status: 'init',
      caseId: localStorage.getItem('caseId'),
      userId: localStorage.getItem('userId'),
      setComments: (comments) => set({comments}),
      setComment: (comment) => set({comment}),
      addComment: (comment) => set({comments: [...get().comments, comment]}),
      removeComment: (id) => set({comments: get().comments.filter(comment => comment.id !== id)}),
      handleChange: (fieldName, event) => {
         const {value} = event.target;
         console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
         set({[fieldName]: value});
      },
      handleComment: async (e) => {
         e.preventDefault()
         const token = localStorage.getItem('token');
         const userIdToken = getIdFromToken(token);
         set({userId: userIdToken})
         set({status: 'loading'})
         const response = await axios.post(`http://localhost:8080/api/v1/legalcase/${get().caseId}/comment`, {
            "userId": get().userId,
            "commentContent": get().comment,
            "legalCaseId": get().caseId
      }
      )
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'})
         set({comment: ''})
         set({comments: [...get().comments, response.data.response]})
      }
      },

      getCaseComments : async (caseId) => {
         set({status: 'loading'});
         console.log(caseId);
         localStorage.setItem('caseId', caseId);
         const response = await axios.get(`http://localhost:8080/api/v1/legalcase/${caseId}/comments`);
         if(response.data.response != null || response.data.code == '0000'){
            set({status: 'success'});
           // console.log(response.data.response);
            set({comments: response.data.response});
            console.log(response);
         }
      },
      

      


         

}))

   