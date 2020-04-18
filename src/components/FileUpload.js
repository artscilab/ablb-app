import React, { useState } from 'react';
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone'
import { ActionButton } from './common';
import { toast } from 'react-toastify';
import request from '../utils/requests';

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

const FileUpload = ({ children, ...props }) => {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDropAccepted: f => {
      setFile(f[0])
    },
    onDropRejected: f => {
      toast.error("Only mp4 videos are supported")
    },
    accept: "video/mp4"
  });
  
  return (
    <FileUploadForm>
      <FileContainer {...getRootProps()}>
        <input {...getInputProps()} {...props}>
        </input>
        <p>Drop video file here, or click to browse</p>
        {file && (
          <p className="selected">Selected: {file.name}</p>
        )}
      </FileContainer>
      <ActionButton onClick={async () => {
        if (!file) {
          toast.error("Choose a file!")
          return;
        }
        const formData = new FormData();
        formData.append("videoFile", file)
        try {
          await request.patch(`/videos/${props.id}/upload`, formData, {
            headers: {
              'content-type': "multipart/form-data"
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