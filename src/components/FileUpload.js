import React, { useState } from 'react';
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone'
import { ActionButton } from './common';
import { toast } from 'react-toastify';
import request from '../utils/requests';
import ProgressBar from './ProgressBar';

const FileUploadForm = styled.div`
`

const FileContainer = styled.div`
  background: ${props => props.theme.transparentBg};
  padding: 35px 10px; 
  margin-bottom: 15px;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${props => props.theme.green};
  cursor: pointer;

  p {
    font-size: 16px;
    text-align: center;
  }
  p.selected {
    margin-top: 10px;
  }
`

const FileUpload = ({ children, prompt, accept, resourceName, maxSize, id, formDataName, ...props }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDropAccepted: f => {
      setFile(f[0])
    },
    onDropRejected: f => {
      if (f[0].size > maxSize / 1024 / 1024) {
        toast.error(`Make sure file is less than ${maxSize/1024 / 1024} mb in size`);
      } else {
        toast.error(`Only ${accept} file types are supported.`)
      }
    },
    accept: accept,
    maxSize: maxSize,
  });
  
  return (
    <FileUploadForm>
      <FileContainer {...getRootProps()}>
        <input {...getInputProps()} {...props}>
        </input>
        <p>{prompt}</p>
        {file && (
          <p className="selected">Selected: {file.name}</p>
        )}
      </FileContainer>
      
      {progress > 0 &&
        <ProgressBar percentage={progress}></ProgressBar>
      }
      
      <ActionButton onClick={async () => {
        if (!file) {
          toast.error("Choose a file!")
          return;
        }
        const formData = new FormData();
        formData.append(formDataName, file)
        
        try {
          await request.post(`/${resourceName}/${id}/upload`, formData, {
            headers: {
              'content-type': "multipart/form-data"
            },
            onUploadProgress: function(progressEvent) {
              let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              setProgress(percentCompleted)
            }
          })
          window.location.reload();
        } catch (e) {
          toast.error("Failed to upload video")
        }
      }}>Upload file</ActionButton>
    </FileUploadForm>
  )
}

export default FileUpload;