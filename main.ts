import{readFileSync as r,mkdirSync as m,readdirSync as d,writeFileSync as w}from"node:fs";
import{join as j}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const f of d(I).sort()){
 const P=r(j(I,f,"program.bin")),N=r(j(I,f,"input.bin"));
 let S=[],C=[],M=new Int32Array(256),B=[],p=0,s=0,i=0,e=0;
 try{
  for(;;){
   if(s===1e6)throw 10;
   if(p<0||p>=P.length)throw 9;
   const o=P[p],A=o>15&&o<35&&o!==31;
   let q,u;
   if(o<8){q="00011223"[o]|0;u="01102233"[o]|0}
   else if(A){q=o===23||o===27?1:2;u=1}
   else if(o>47&&o<53){q=o===49||o===50?1:0;u=0}
   else if(o===64){q=1;u=1}
   else if(o===65){q=2;u=0}
   else if(o>79&&o<84){q=o===82?0:1;u=o===82?1:0}
   else throw 5;
   const l=o===1?1:o===2?4:o>47&&o<52?2:0;
   if(p+l>=P.length)throw 9;
   s++;
   const n=p+1+l,a=P[p+1],b=P[p+2],c=P[p+3],g=P[p+4],R=((a|b<<8)<<16)>>16;
   if(S.length<q)throw 2;
   if(S.length-q+u>256)throw 3;
   p=n;
   if(o===0)throw 0;
   if(o===1)S.push((a<<24)>>24);
   else if(o===2)S.push(a|b<<8|c<<16|g<<24);
   else if(o===3)S.pop();
   else if(o===4)S.push(S.at(-1));
   else if(o===5){const t=S.at(-1);S[S.length-1]=S.at(-2);S[S.length-2]=t}
   else if(o===6)S.push(S.at(-2));
   else if(o===7){const t=S[S.length-3];S[S.length-3]=S.at(-2);S[S.length-2]=S.at(-1);S[S.length-1]=t}
   else if(A){
    if(o===23)S.push(-S.pop()|0);
    else if(o===27)S.push(~S.pop());
    else{
     const y=S.pop(),x=S.pop();
     let v;
     if(o===16)v=(x+y)|0;
     else if(o===17)v=(x-y)|0;
     else if(o===18)v=Math.imul(x,y);
     else if(o===19){if(!y)throw 4;v=(x/y)|0}
     else if(o===20){if(!y)throw 4;v=(x%y)|0}
     else if(o===21){if(!y)throw 4;v=(x>>>0)/(y>>>0)|0}
     else if(o===22){if(!y)throw 4;v=(x>>>0)%(y>>>0)|0}
     else if(o===24)v=x&y;
     else if(o===25)v=x|y;
     else if(o===26)v=x^y;
     else if(o===28)v=x<<(y&31);
     else if(o===29)v=x>>(y&31);
     else if(o===30)v=(x>>>(y&31))|0;
     else if(o===32)v=x===y?1:0;
     else if(o===33)v=x<y?1:0;
     else v=(x>>>0)<(y>>>0)?1:0;
     S.push(v);
    }
   }
   else if(o===48)p+=R;
   else if(o===49){if(!S.pop())p+=R}
   else if(o===50){if(S.pop())p+=R}
   else if(o===51){if(C.length===64)throw 7;C.push(p);p=a|b<<8}
   else if(o===52){if(!C.length)throw 8;p=C.pop()}
   else if(o===64){const k=S.at(-1);if(k<0||k>255)throw 6;S[S.length-1]=M[k]}
   else if(o===65){const k=S.at(-1);if(k<0||k>255)throw 6;M[k]=S.at(-2);S.length-=2}
   else if(o===80){const t=String(S.at(-1));if(B.length+t.length>65536)throw 11;S.pop();for(const h of t)B.push(h.charCodeAt(0))}
   else if(o===81){if(B.length>=65536)throw 11;B.push(S.pop()&255)}
   else if(o===82)S.push(i<N.length?N[i++]:-1);
   else throw S.pop()&255;
  }
 }catch(x){if(typeof x!=="number")throw x;e=x}
 m(j(O,f),{recursive:true});
 w(j(O,f,"stdout.bin"),Buffer.from(B));
 w(j(O,f,"exit.txt"),e+"\n");
}
