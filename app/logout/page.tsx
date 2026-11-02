'use client';
import {useEffect,useState} from 'react';
export default function Logout(){const [error,setError]=useState('');async function logout(){try{const r=await fetch('/api/auth/logout',{method:'POST'});if(!r.ok)throw Error('Unable to sign out. Please retry.');window.location.replace('/login');}catch(e){setError((e as Error).message);}}useEffect(()=>{logout();},[]);return <main className="logout-page"><h1>{error?'Sign out':'Signing out…'}</h1>{error&&<><p role="alert">{error}</p><button className="primary" onClick={logout}>Retry</button></>}</main>;}
