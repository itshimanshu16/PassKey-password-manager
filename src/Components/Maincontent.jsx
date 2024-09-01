import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Maincontent = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const Showpassword = () => {
        if (ref.current.src.includes("/img/eyecross.png")) {
            ref.current.src = "/img/eye.png";
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "/img/eyecross.png";
            passwordRef.current.type = "text";
        }
    };

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const Savepassword = () => {
        if(form.site.length>3 && form.username.length >3 && form.password.length>3 ){

            const newEntry = { ...form, id: uuidv4() };
            const updatedArray = [...passwordArray, newEntry];
            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
        setForm({ site: "", username: "", password: "" });
        toast('Save Ho Gya👌!!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        
        });
    };}

    const editpassword = (id) => {
        console.log("editing password of id -", id);
        const itemToEdit = passwordArray.find(item => item.id === id);
        setForm(itemToEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const deletepassword = (id) => {
        console.log("deleting password of id -", id);
        let c = confirm("Kar du Delete??");
        if (c) {
            const updatedArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            toast('Delete Ho Gya!!!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Text Copied!!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
            />
            <div className='bg-white border-none rounded-xl flex flex-col justify-center items-center bg-opacity-5 m-10 mx-auto w-2/3 content-center'>
                <div className='font-bold text-3xl text-center'>
                    <span>&lt;Pass</span>
                    <span className='text-blue-600'>Key&gt;</span>
                </div>
                <div className='text-center p-2 text-lg'>Your Own Password Manager</div>

                <input value={form.site} onChange={handleChange} name='site' className='text-black w-5/6 px-5 p-1 rounded-full border-gray-500 border-2' placeholder='Enter Website Url' type="text" />
                <div className='flex relative w-full p-4 px-20 gap-4'>
                    <input value={form.username} onChange={handleChange} name='username' className='w-2/3 p-1 px-5 text-black border-2 border-gray-500 rounded-full' placeholder='Email ID' type="text" />
                    <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' className='w-1/3 px-5 text-black border-2 border-gray-500 rounded-full' placeholder='Password' type="password" />
                    <span className='absolute right-24 cursor-pointer bottom-5' onClick={Showpassword}>
                        <img ref={ref} className='w-6' src="../img/eye.png" alt="Toggle Visibility" />
                    </span>
                </div>
                <button onClick={Savepassword} className='bg-white m-4 flex items-center bg-opacity-10 border rounded-full p-1 hover:bg-opacity-20'>
                    <span className="material-symbols-outlined">
                        add_box
                    </span>
                    Add Password
                </button>
            </div>
            <div className='text-center text-3xl font-bold p-8'>Your Passwords</div>
            {passwordArray.length === 0 && <div className='text-2xl text-center text-gray-500'>Password Nhi hai !!!!</div>}
            {passwordArray.length !== 0 &&
                <div className='flex justify-center w-'>

                    <div className='flex justify-center bg-white border-none rounded-xl overflow-hidden bg-opacity-5 w-2/3'>
                        <table className="table-auto w-full border rounded-xl overflow-hidden mb-40">
                            <thead className='bg-white bg-opacity-10 h-5'>
                                <tr className='h-10 '>
                                    <th>Website</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => (
                                    <tr key={item.id} className='text-center h-10'>
                                        <td><div className='flex justify-center'><a href={item.site} target='_blank'>{item.site}</a><span><img onClick={() => { copyText(item.site) }} className='w-6 cursor-pointer hover:scale-125' src="/img/copy.png" alt="Copy" /></span></div></td>
                                        <td><div className='flex justify-center'>{item.username}<span><img onClick={() => { copyText(item.username) }} className='w-6 cursor-pointer hover:scale-125' src="/img/copy.png" alt="Copy" /></span></div></td>
                                        <td><div className='flex justify-center gap-2'>{item.password}<span><img onClick={() => { copyText(item.password) }} className='w-6 cursor-pointer hover:scale-125' src="/img/copy.png" alt="Copy" /></span></div></td>
                                        <td><div className='flex justify-center gap-4'>
                                            <span><img onClick={() => editpassword(item.id)} className='w-6 cursor-pointer hover:scale-125' src="/img/edit.png" alt="Edit" /></span>
                                            <span><img onClick={() => deletepassword(item.id)} className='w-6 cursor-pointer hover:scale-125' src="/img/delete.png" alt="Delete" /></span>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>}
        </>
    )
}

export default Maincontent;
