import React from 'react';
import axios from 'axios';

function breedGet() {
    var [responseData, setResponseData] = React.useState('');
    const fetchData = React.useCallback(() => {
      axios.get('https://dog.ceo/api/breeds/list/all')
        .then((response) => {
          setResponseData(Object.keys(response.data.message));
          console.log(response.data.message);
          breedList = [];
          for (var i = 0; i < Object.keys(response.data.message).length; i++) {
            breedList.push({ 'key': Object.keys(response.data.message)[i], 'text': Object.keys(response.data.message)[i], 'value': Object.keys(response.data.message)[i] });
          }
          console.log(breedList)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
    React.useEffect(() => {
      fetchData()
    }, [fetchData])
}