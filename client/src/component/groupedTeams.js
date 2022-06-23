import React, { useEffect, useState } from 'react'
import * as actions from '../actions/index'
import { connect } from 'react-redux'
import {Box, Flex, VStack, Button, Text, Heading} from '@chakra-ui/react'


function GroupedTeams(props) {
  

  const [allData,setallData] = useState([])
  const [pairs, setPairs] = useState([])
  const [accha,SetAccha] = useState([])
  const [finalArr, setFinalArr] = useState([])
  const [senderArr, setSenderArr] = useState([])
  
  const [Link,SetLinkTrue] = useState(null)
  

  const MakeFinalArray = (data) => {
    if(finalArr.length>0) {
      let winner = finalArr.map((item,i)=>{
        if(item.includes(' wins')){
          let winn = item.split('wins')[0] 
          pset(winn,data)
        }
        
      })
      
      
    }

  }

  const pset = (target,data) => {
    let newS = target.trim()
    
  const f = data.map((item,i)=>{
      if(item.team === newS){
        item.score = item.score + 1
      }
      return item
    })
    setSenderArr(f)
    
  }

  useEffect(()=>{
    if(senderArr.length == allData.length){
      console.log(senderArr)
      MakeRequests(senderArr)
    }
  },[senderArr])

  const MakeRequests = async (d) =>{
    d.forEach(element => {
        const data = props.updateAllTeams(element) 
    });
  }

  
    useEffect(()=>{
        GetAllTeams()
    },[])

    const GetAllTeams = async () =>{
        const team = await props.getAllTeams()
        if(team){
          setallData(team.payload)
        }
    }

    useEffect(()=>{
        if(allData.length>0){
            MakePairs(allData)
        }
    },[allData])
    
    const MakePairs = (data) => {
      var splitAt = function(i, xs) {
        var a = xs.slice(0, i);
        var b = xs.slice(i, xs.length);
        return [a, b];
      };
      
      var shuffle = function(xs) {
        return xs.slice(0).sort(function() {
          return .5 - Math.random();
        });
      };
      
      var zip = function(xs) {
        return xs[0].map(function(_,i) {
          return xs.map(function(x) {
            return x[i];
          });
        });
      }
      

      var result = zip(splitAt(data.length/2, shuffle(data)));
      
      setPairs(result)
  }
  const Winners = () => {
    let winn = []
    const newTeams = pairs.map((item,i)=>{
      const decider = Math.floor(Math.random() * item.length)
      if(decider == 1){
        if(pairs.length == 1) {
          let clone = [...finalArr]
          clone.push(item[0].team + " losses")
          clone.push(item[1].team + ' wins')
          setFinalArr(clone)
        }

        let text = `${item[0].team} lost by ${item[1].team}`

        let cloneTextArray = [...accha]
        cloneTextArray.push(text)
        SetAccha(cloneTextArray)

        item[1].score = item[1].score + 1
        item[0].score = item[0].score + 1

        

        winn.push(item[1])
      }
      else if(decider == 0){
        
        if(pairs.length == 1) {

          let clone = [...finalArr]
          clone.push(item[0].team + ' wins')
          clone.push(item[1].team + ' losses')
          setFinalArr(clone)
        }


          let text = `${item[0].team} won against ${item[1].team}`
        
        
        let cloneTextArray = [...accha]
        cloneTextArray.push(text)
        SetAccha(cloneTextArray)

        item[0].score = item[0].score + 1
        item[1].score = item[1].score + 1
        
        
        winn.push(item[0])
      }
    })
    MakeFinalArray(allData)
    MakePairs(winn)
  } 
  

  return (
    <Box w="100vw" h="100vh">
      <Flex w="100%" h="100%" flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
      <VStack py={10} w="70%" h="100%">
        <Box w="100%" h="10%" textAlign={'center'}>
          <Heading>
            Fixtures
          </Heading>
        </Box>
        
      {
      finalArr.length > 0 ? (
        finalArr.map((item,i)=>(
          <Text key={i}>
            {item}
          </Text>
        ))
      ):( 
        pairs.map((item,i)=>(
        <Box px={10} w="100%" h="20%" key={i}>
          <VStack alignItems={'flex-start'}  w="100%" h="90%">
            <Box>
              <Text>
              {item[0].team}
              </Text>
            </Box>
            <Text>
              vs
            </Text>
            <Box>
              <Text>
              {item[1].team}
              </Text>
            </Box>
          </VStack>
        </Box>
      )))
     }

     {
      finalArr.length > 0 ? (
        <Button 
      onClick={()=>{Winners();SetLinkTrue(true)}}
      w="60%" h="10%">
        Save Scores
      </Button>
      ):(
        <Button 
      onClick={()=>{Winners()}}
      w="60%" h="10%">
        Simulate
      </Button>
      )
     }
      
      <Box>
     {
      Link ? (
        <Box py={10}>
          <a href="/" >
            See Leaderboard
          </a>
          </Box>
      ):(null)
     }
      </Box>
      </VStack>

      <Box 
      
      w="30%" h="100%">
        <Flex w="100%"
        flexDirection={'column'} alignItems={'center'} justifyContent={'center'} h="100%">
          <VStack 
          
          alignItems={'flex-start'}
          justifyContent={'center'}
          w="90%" h="100%">
            {
              accha?.map((item,i)=>(
                <Text key={i}>
                  {item}
                </Text>
              ))
            }
          </VStack>
        </Flex>
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
export default connect(mapStateToProps,actions)(GroupedTeams)
