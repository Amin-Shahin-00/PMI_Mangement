import { cookies } from 'next/headers';
import { database } from './pmi-db';
const encode=new TextEncoder();
export const cookieName='mirror_session';
export async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encode.encode(value)))).map(v=>v.toString(16).padStart(2,'0')).join('');}
export async function passwordHash(password:string,salt:string){const key=await crypto.subtle.importKey('raw',encode.encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:encode.encode(salt),iterations:100000},key,256);return Array.from(new Uint8Array(bits)).map(v=>v.toString(16).padStart(2,'0')).join('');}
export async function seedAdmin(){const db=database();if(!await db.prepare('SELECT username FROM accounts WHERE username=?').bind('admin').first()){const salt=crypto.randomUUID(),hash=await passwordHash('1234',salt);await db.batch([db.prepare("INSERT OR IGNORE INTO accounts (username,name,password_hash,salt,role) VALUES ('admin','Administrator',?,?,'Admin')").bind(hash,salt),db.prepare("INSERT OR IGNORE INTO members (email,name,role) VALUES ('admin','Administrator','Admin')")]);}}
export async function currentUser(){const token=(await cookies()).get(cookieName)?.value;if(!token)return null;return database().prepare('SELECT a.username,a.name,a.role,a.username AS email FROM sessions s JOIN accounts a ON a.username=s.username WHERE s.token_hash=? AND s.expires>?').bind(await digest(token),Date.now()).first<{username:string,name:string,role:string,email:string}>();}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return !origin||origin===new URL(request.url).origin;}
