import React, { useEffect, useState } from 'react'
import { WrapperHeader } from '../../components/HeaderComponent/style'
import Loading from '../../components/LoadingComponent/Loading'
import { WrapperContentProfile, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Button } from 'antd'
import * as message from "../../components/Mesage/Message.jsx";
import * as UserService from '../../services/UserService'
import { UploadOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { updateUser } from '../../redux/slides/userSlide'
import { getBase64 } from '../../utils'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const navigate = useNavigate()
  const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
      setEmail(user?.email)
      setName(user?.name)
      setPhone(user?.phone)
      setAddress(user?.address)
      setAvatar(user?.avatar)
  }, [user])
  useEffect(() => {
    if (isSuccess) {
        message.success()
        handleGetDetailsUser(user?.id, user?.access_token)
     
    } else if(isError) {
        message.error()
    }
},[isSuccess, isError])
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
}

const handleOnchangeEmail = (value) => {
    setEmail(value)
}
const handleOnchangeName = (value) => {
    setName(value)
}
const handleOnchangePhone = (value) => {
    setPhone(value)
}
const handleOnchangeAddress = (value) => {
    setAddress(value)
}

const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setAvatar(file.preview)
}

const handleUpdate = () => {
    mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token },{
        onSuccess:()=>{
            // dispatch(updateUser({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token}))
            //   navigate('/')
        }
    })
    
}
  return (
       <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperInput className='justify-center'>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                   
                    </WrapperInput>
                    <WrapperInput className='justify-center' >
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                       
                    </WrapperInput>
                    <WrapperInput className='justify-center'>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={phone} onChange={handleOnchangePhone} />
                        
                    </WrapperInput>
                    <WrapperInput className='justify-center items-center'>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <div className='flex gap-3 items-center w-[299px]'> <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
                        {/* <InputForm style={{ width: '300px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
                       </div>
                       
                    </WrapperInput>
                    <WrapperInput className='justify-center'>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                       
                    </WrapperInput>
                    <ButtonComponent className='mx-auto'
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                </WrapperContentProfile>
            </Loading>
    </div>
  )
}

export default ProfilePage