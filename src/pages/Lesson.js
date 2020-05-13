import React, { useState, useEffect, useContext } from 'react';
import { PageHeader, PageContent, ActionButton, ErrorMessage } from '../components/common';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import request from '../utils/requests';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { SessionContext } from '../utils/session';
import Spinner from '../components/Spinner';

const VideoContainer = styled.div`
  margin: 50px 0;
  padding: 10px;
  background: ${props => props.theme.transparentBg};
  box-shadow: 0 0 35px 0 ${props => props.theme.boxShadowColor};
`

const VideoPlayer = styled.div`
  margin: 0 auto 35px auto;
`

const VideoDetails = styled.div`
  padding: 35px;
  
  h2 {
    margin-bottom: 15px;
  }

  ${ErrorMessage} {
    margin-bottom: 25px;

  }
`

const VideoSelectorContainer = styled.div`
  margin-top: 35px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Lesson = () => {
  const { id } = useParams();
  const history = useHistory();
  const [lesson, setLessonData] = useState(null);
  const [videos, setVideos] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [error, setError] = useState(null);
  const { user } = useContext(SessionContext);

  useEffect(() => {
    const getLesson = async () => {
      try {
        let r = await request.get(`/lessons/${id}?include`)
        setLessonData(r.data);
        setVideos(r.data.videos);
      } catch (e) {
        history.push("/404")
      }
    }

    getLesson();
  }, [history, id])

  if (!user) {
    return (
      <Redirect to="/signup?showMessage=true"></Redirect>
    )
  }

  return (
    <div>
      {lesson === null 
        ? 
        <>
          <PageHeader>Loading</PageHeader> 
          <PageContent>
            <Spinner></Spinner>
          </PageContent>
        </>
        : 
        <>
          <PageHeader>{lesson.title}</PageHeader>
          <PageContent>
            <p>{lesson.description}</p>
            {videos && videos[selectedVideoIndex] && (
              <VideoContainer>
                <VideoDetails>
                  <ReactPlayer
                    controls
                    width="100%"
                    height="auto"
                    wrapper={VideoPlayer}
                    onError={(e) => {
                      setError("There was a problem loading the video");
                    }}
                    url={`/api/videos/${videos[selectedVideoIndex].id}/stream?token=${user.token}`}></ReactPlayer>
                  {error && (
                    <ErrorMessage>{error}</ErrorMessage>
                  )}
                  <h2>{videos[selectedVideoIndex].title}</h2>
                  <p>{videos[selectedVideoIndex].description}</p>
                  {videos.length > 0 && (
                    <VideoSelectorContainer>
                      <ActionButton
                        disabled={selectedVideoIndex === 0}
                        onClick={() => {
                          setError(null)
                          setSelectedVideoIndex(selectedVideoIndex - 1)
                        }}
                        inverted
                        >Previous part</ActionButton>
                      <ActionButton
                        disabled={selectedVideoIndex === videos.length - 1}
                        onClick={() => {
                          setError(null)
                          setSelectedVideoIndex(selectedVideoIndex + 1)
                        }}
                      >Next part</ActionButton>
                    </VideoSelectorContainer>
                  )}
                </VideoDetails>
              </VideoContainer>
            )}
          </PageContent>
        </>
      }
    </div>
  )
}

export default Lesson;