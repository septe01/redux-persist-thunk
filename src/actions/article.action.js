import client from '../utils/client';

exports.getArticle = () => dispatch => {
  dispatch({
    type: 'GET_ARTICLE',
  });
  client
    .get('/articles') // return status code 500 internal server error
    .then(result => {
      console.log(result);
      dispatch({
        type: 'GET_ARTICLE_SUCCESS',
        payload: {
          data: result.data,
          message: 'success get article',
        },
      });
    })
    .catch(err => {
      console.log({err});
      const statusCode = err?.response?.status;
      dispatch({
        type: 'GET_ARTICLE_FAILED',
        payload: {
          message: 'failed to get article',
        },
      });
    });
};

//     const requestToApi = () => {
//         setLoading(true)
//         requestCounter += 1
//         axios.get('http://www.mocky.io/v2/5e8321d13100005b00e641a8') // return status code 500 internal server error
//             .then(result => {
//                 console.log(result)
//             }).catch(err => {
//                 console.log({ err })
//                 const statusCode = err?.response?.status;

//                 // jalankan kembali request ke api selama 3 kali
//                 if (statusCode == 500 && requestCounter <= 3) {
//                     setCount(requestCounter)
//                     requestToApi()
//                 } else {
//                     requestCounter = 0
//                     // pada kondisi ini otomatis proses request akan berhenti
//                     setLoading(false)
//                 }
//             })
//     }
