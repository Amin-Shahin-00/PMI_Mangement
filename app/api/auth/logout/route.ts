import { cookies } from 'next/headers';
import {database} from '../../../../lib/pmi-db';
import {digest,sameOrigin,cookieName} from '../../../../lib/auth';
export async function POST(request:Request){if(!sameOrigin(request))return Response.json({error:'Invalid request origin'},{status:403});const token=(await cookies()).get(cookieName)?.value;if(token)await database().prepare('DELETE FROM sessions WHERE token_hash=?').bind(await digest(token)).run();return Response.json({ok:true},{headers:{'Set-Cookie':`${cookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`,'Cache-Control':'no-store'}});}
