import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function App() {
  const [contentState, setContentState] = useState(undefined);

  // function uploadImageCallBack(file) {
  //   return new Promise(
  //     (resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.open('POST', 'https://api.imgur.com/3/image');
  //       xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
  //       const data = new FormData();
  //       data.append('image', file);
  //       xhr.send(data);
  //       xhr.addEventListener('load', () => {
  //         const response = JSON.parse(xhr.responseText);
  //         resolve(response);
  //       });
  //       xhr.addEventListener('error', () => {
  //         const error = JSON.parse(xhr.responseText);
  //         reject(error);
  //       });
  //     }
  //   );
  // }

  function uploadImageCallBack (file) {
    return new Promise((resolve, reject) => {
      var formdata = new FormData();
      formdata.append("_file", file, file.name);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://10.0.4.121/api/UploadFile", requestOptions)
        .then(response => response.json())
        .then(fileDoc => {
          resolve({ 
            data: { 
              link: 'http://10.0.4.121/api/DownloadFile?id=' + fileDoc.id
            }
          })
        })
        .catch(error => {
          if (error) console.error(error);
          reject(error);
        });
    });
  }

  return (
    <div style={{ padding: '50px 300px 50px 300px' }}>
      <Editor 
        initialContentState={contentState}
        onContentStateChange={(contentState) => {
          setContentState(contentState);
        }}
        toolbar={{
          image: { 
            uploadCallback: uploadImageCallBack, 
            alt: { present: false }, 
          },
        }}
      />
    </div>
  );
}

export default App;
