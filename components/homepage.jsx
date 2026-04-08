"use client";

import { SocketContext } from "@components/Context";
import Loader from "@components/Loader";
import Call from "@components/call";
import RatingBAr from "@components/ratingBar";
import { PersonOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCallOutline } from "react-icons/io5";
import io from "socket.io-client"


const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [therapists, setTherapists] = useState([]);
  const [chats, setChats] = useState([]);
  const [showAvaThe, setShowAvaThe] = useState(false);
  const [callerDialogOpen, setCallerDialogOpen] = useState(false);
  const [reciverData, setReciverData] = useState({});

  const [logedUser, setLogedUser] = useState({});
  const router = useRouter();

  const {  setName, callEnded,callUser,call,setCallDialogOpened,turnOnMedia,setCallerData,setIsCaller } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      // getAllTherapists();
      getChats();
      getLogedUser(user._id);
      setLoading(false);
    }
  }, [user]);

  


  const getAllTherapists = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/therapists`,{ cache: 'no-store', next: { revalidate: 0 } });
      const data = await res.json();
      console.log(data);
      setTherapists(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  


  const createChat = async (user_data) => {
    setLoading(true);
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: user._id,
        members: [user_data._id],
        isGroup: false,
        name: user_data.username,
      }),
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/chats/${chat._id}`);
      setLoading(false);
    }
  };

  const getChats = async () => {
    try {
      const res = await fetch(

        `/api/users/${user._id}`
      );
      const data = await res.json();
      console.log("TTTTT:", data);
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getChatMember = (memArr) => {
    const member = memArr.filter(mem => mem._id != user._id);
    return `Unknown-${member[0]._id.slice(-4)}`
  }

  const createCall = (therapist) => {
    
    // turnOnMedia();
    // console.log(therapist);
    // setTimeout(()=>{
      setReciverData(therapist);
      setIsCaller(true)
      setCallerData(therapist)
      setTimeout(()=>{
        callUser(therapist.socketId,logedUser);
      },100)
      
      setCallDialogOpened(true);
    // },1000);  
  }

  const getLogedUser = async (id) => {
    const res = await fetch(

      `/api/user/${id}`
    );
    const data = await res.json();
    setLogedUser(data)
  }

  const onShowAllTherapist =()=>{
    setShowAvaThe(!showAvaThe);
    getAllTherapists();
  }

  // useEffect(()=>{
  //   setCallerDialogOpen(call.isReceivingCall);
  //   if(call.isReceivingCall){
  //       setIdCaller(false)
  //   }
  //   // if(callEnded){
  //   //     setCallerDialogOpen(false);
  //   // }
    
  // },[call.isReceivingCall,callEnded])


  return loading ? (
    <Loader />
  ) : (

    <div className="profile-page">
      {!user.isTherapist &&
        <div>
          <div className="bot-back bg-center flex m-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2  font-bold text-gray-900 dark:text-white text-center health-chatbot">Health Chatbot</h5>
              <p className="drop-shadow-[5px_5px_5px_5px_rgba(255,255,255,255)] mb-3 font-bold text-gray-700 dark:text-gray-400 flex flex-row text-center"> The chatbot offers mental health support through an AI-powered assistant.</p>
              <div className="flex flex-row items-center justify-center">
                <button onClick={() => router.push(`/chatbot`)} className=" w-full lg:mx-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2">Chat Now</button>
              </div>
            </div>
          </div>
          <div className="bot-back1 bg-center flex m-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2  font-bold text-gray-900 dark:text-white text-center health-chatbot">Talk to a Therapist</h5>
              <p className="drop-shadow-[5px_5px_5px_5px_rgba(255,255,255,255)] mb-3 font-bold text-gray-700 dark:text-gray-400 flex flex-row text-center">Connect with a professional therapist for personalized guidance and counseling.</p>
              <div className="flex flex-row items-center justify-center">
                <button onClick={() => onShowAllTherapist()} className=" w-full lg:mx-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"> Show Available Therapists  </button>
              </div>
            </div>
          </div>
        </div>

      }
      {showAvaThe && <h1 className="text-heading3-bold">{user.isTherapist ? "Welcome, Sir" : "Avaible Therapists "}</h1>}

      {!user.isTherapist ?
        <div className="flex flex-wrap items-center justify-center">
          {showAvaThe && therapists.map(tt => (
            <div className="flex m-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="rounded-full object-cover w-full m-4 h-50 md:h-auto md:w-[20%]" src="assets/doctorplace.jfif" alt=""></img>
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <h5 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">Dr. {tt.fullName}</h5>
                <p className="mb-3 font-bold text-gray-700 dark:text-gray-400 flex flex-row">Specialization:<p className="font-normal mx-4">{tt.special}</p></p>
                <div className="flex flex-row items-center justify-between">
                  <RatingBAr rate={3} />
                  <div className="flex flex-row">
                    <button onClick={() => createCall(tt)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm flex items-center justify-center text-center me-2 mb-2 w-[45px] h-[45px]"><IoCallOutline size={22} /></button>
                    <button onClick={() => createChat(tt)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Message</button>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div> :
        <div>
          <h1 className="text-2xl font-semibold text-center">User Messages :</h1>
          <div className="flex flex-wrap items-center justify-center">
            {chats.length > 0 && chats.map(chat => (
              <div className="flex m-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="rounded-full object-cover w-full m-4 h-50 md:h-auto md:w-[20%]" src="assets/userplace.jpg" alt=""></img>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">User: {getChatMember(chat.members)}</h5>
                  <p className="mb-3 font-bold text-gray-700 dark:text-gray-400 flex flex-row">Message:<p className="font-normal mx-4">{chat.messages.length !== 0 ? chat.messages[chat.messages.length - 1].text : "Epmty"}</p></p>
                  <div className="flex flex-row items-center justify-between">

                    <div className="flex flex-row">
                      <button onClick={() => router.push(`/chats/${chat._id}`)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Accept</button>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      }

      {/* {
        callerDialogOpen  && isCaller && <Call isCaller={isCaller} callerData={callerData} reciverData={reciverData} setCallerDialogOpen={setCallerDialogOpen} />
      }
      {
        callerDialogOpen && !isCaller && <Call isCaller={isCaller} callerData={callerData} reciverData={reciverData} setCallerDialogOpen={setCallerDialogOpen} />
      } */}
    </div>
  );
};

export default Profile;
