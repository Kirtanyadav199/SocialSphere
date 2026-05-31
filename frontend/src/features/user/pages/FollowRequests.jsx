import React, { useState,useEffect } from 'react'
import { getFollowRequests,acceptRequest,rejectRequest } from '../services/user.api'
import Layout from '../../../Components/Layout/Layout';


const FollowRequests = () => {

    const [requests,setRequests] = useState([]);

    async function loadRequests(){
      try{
        const response = await getFollowRequests();
         setRequests(response.requests)
      }
      catch(err){
        console.log(err)
      }
    }

   useEffect(() => {
    loadRequests();
  }, []);

  if(requests.length == 0){
      return (
      <Layout>
         <h1>Follow Requests</h1>
         <p>No pending requests</p>
      </Layout>
      )}

  async function handleAccept(id){
    try{
      await acceptRequest(id)
      loadRequests()
    }catch(err){
      console.log(err)
    }
  }

     async function handleReject(id){
    try{
      await rejectRequest(id);

      loadRequests();
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <>
    <Layout>
    <h1>Follow Requests</h1>
    <div className="requests">
      
      {requests.map((request)=>{

       return <div key={request._id} className='request'>
           <h3>
            {request.follower.username}
           </h3>
           <button
           onClick={()=>{
            handleAccept(request._id)
           }}
           >
            Accept
           </button>
           <button
           onClick={()=>{
            handleReject(request._id)
           }}
           >Reject</button>
        </div>
      })}
    </div>
       
      </Layout>
    </>
  )
}

export default FollowRequests
