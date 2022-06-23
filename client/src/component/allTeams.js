import React, { useEffect, useState } from 'react'
import * as actions from '../actions/index'
import { connect } from 'react-redux'
import {Box, Flex, VStack, Button} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

function AllTeams(props) {
  const navigate = useNavigate()

  const [allData,setallData] = useState([])

 const GetAllTeams = async () => {
    const team = await props.getAllTeams()
    if(team){
      let dat = team.payload.sort((a,b)=>(a.score > b.score) ? -1:1)
      setallData(dat)
    }
 }
   
  
  return (
    <Box w="90vw" h="100vh">
        <Flex w="100%" h="100%" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Box w="80%" h="90%">
            <VStack w="100%" h="100%">
            <Box 
                    w="100%" h="10%">
                      <Button onClick={()=>GetAllTeams()}>Get teams</Button>
                      <Flex 
                      py={5}
                      w="100%" h="100%" flexDirection={'row'} alignItems={'flex-start'} justifyContent={'space-around'}>
                        <Box w={['50%','30%','20%']}>
                          Teams
                        </Box>
                        <Box >
                          Score
                        </Box>
                      </Flex>
                    </Box>
              {
                allData && allData.length > 0 ? (
                  allData.map((item,i)=>(
                    <Box 
                    key={i}
                    w="100%" h="10%">
                      <Flex 
                      py={5}
                      w="100%" h="100%" flexDirection={'row'} alignItems={'flex-start'} justifyContent={'space-around'}>
                        <Box  w={['50%','30%','20%']}>
                          {item.team}
                        </Box>
                        <Box>
                          {item.score}
                        </Box>
                      </Flex>
                    </Box>
                  ))
                ) : (null)
              }

              <Box py={['5','5','5']} w="50%" h="10%">
                <Button w="100%" onClick={()=>{navigate('/grouped')}}>
                  Start IPL
                </Button>
              </Box>
            </VStack>
          </Box>
        </Flex>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    data:state.team
  }
}
export default connect(mapStateToProps,actions)(AllTeams)
