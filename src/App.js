import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function App() {
  const [contentState, setContentState] = useState(undefined);

  return (
    <div style={{ padding: '50px 300px 50px 300px' }}>
      <Editor 
        initialContentState={contentState}
        onContentStateChange={setContentState}
        toolbar={{
          image: {
            previewImage: true,
            alt: { present: false }, 
            uploadCallback: (file) => {
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
            }, 
          },
        }}
      />
    </div>
  );
}

export default App;
