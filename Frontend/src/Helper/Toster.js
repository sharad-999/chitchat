import toast from 'react-hot-toast';

export const successToast=(noti)=>{
    return toast.success(noti,{
        style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
        },
    })
}
export const errorToast=(noti)=>{
    return toast.error(noti,{
        style: {
            border: '1px solid #713200',
            padding: '16px',
            color: 'red',
        },
    })
}