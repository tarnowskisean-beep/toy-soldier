(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pa="169",bl=0,so=1,wl=2,Ec=1,Tc=2,dn=3,Un=0,Ie=1,Ze=2,Pn=0,bi=1,ro=2,ao=3,oo=4,Rl=5,$n=100,Cl=101,Pl=102,Ll=103,Dl=104,Il=200,Ul=201,Nl=202,Fl=203,Hr=204,kr=205,Ol=206,zl=207,Bl=208,Hl=209,kl=210,Gl=211,Vl=212,Wl=213,Xl=214,Gr=0,Vr=1,Wr=2,Ci=3,Xr=4,qr=5,Yr=6,Kr=7,Ac=0,ql=1,Yl=2,Ln=0,Kl=1,$l=2,Zl=3,bc=4,jl=5,Jl=6,Ql=7,wc=300,Pi=301,Li=302,$r=303,Zr=304,Xs=306,zs=1e3,jn=1001,jr=1002,Ve=1003,th=1004,ss=1005,je=1006,tr=1007,Jn=1008,_n=1009,Rc=1010,Cc=1011,Qi=1012,La=1013,Qn=1014,pn=1015,ts=1016,Da=1017,Ia=1018,Di=1020,Pc=35902,Lc=1021,Dc=1022,Je=1023,Ic=1024,Uc=1025,wi=1026,Ii=1027,Nc=1028,Ua=1029,Fc=1030,Na=1031,Fa=1033,Cs=33776,Ps=33777,Ls=33778,Ds=33779,Jr=35840,Qr=35841,ta=35842,ea=35843,na=36196,ia=37492,sa=37496,ra=37808,aa=37809,oa=37810,ca=37811,la=37812,ha=37813,ua=37814,fa=37815,da=37816,pa=37817,ma=37818,ga=37819,_a=37820,va=37821,Is=36492,xa=36494,Ma=36495,Oc=36283,Sa=36284,ya=36285,Ea=36286,eh=3200,nh=3201,zc=0,ih=1,wn="",ke="srgb",On="srgb-linear",Oa="display-p3",qs="display-p3-linear",Bs="linear",ie="srgb",Hs="rec709",ks="p3",ni=7680,co=519,sh=512,rh=513,ah=514,Bc=515,oh=516,ch=517,lh=518,hh=519,Ta=35044,lo="300 es",mn=2e3,Gs=2001;class Fi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],er=Math.PI/180,Aa=180/Math.PI;function Dn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Se[i&255]+Se[i>>8&255]+Se[i>>16&255]+Se[i>>24&255]+"-"+Se[t&255]+Se[t>>8&255]+"-"+Se[t>>16&15|64]+Se[t>>24&255]+"-"+Se[e&63|128]+Se[e>>8&255]+"-"+Se[e>>16&255]+Se[e>>24&255]+Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]).toLowerCase()}function Le(i,t,e){return Math.max(t,Math.min(e,i))}function uh(i,t){return(i%t+t)%t}function nr(i,t,e){return(1-e)*i+e*t}function sn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function jt(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,n,s,r,a,o,c,l){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],p=n[2],m=n[5],_=n[8],M=s[0],d=s[3],u=s[6],E=s[1],y=s[4],A=s[7],U=s[2],w=s[5],b=s[8];return r[0]=a*M+o*E+c*U,r[3]=a*d+o*y+c*w,r[6]=a*u+o*A+c*b,r[1]=l*M+h*E+f*U,r[4]=l*d+h*y+f*w,r[7]=l*u+h*A+f*b,r[2]=p*M+m*E+_*U,r[5]=p*d+m*y+_*w,r[8]=p*u+m*A+_*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=h*a-o*l,p=o*c-h*r,m=l*r-a*c,_=e*f+n*p+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return t[0]=f*M,t[1]=(s*l-h*n)*M,t[2]=(o*n-s*a)*M,t[3]=p*M,t[4]=(h*e-s*c)*M,t[5]=(s*r-o*e)*M,t[6]=m*M,t[7]=(n*c-l*e)*M,t[8]=(a*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ir.makeScale(t,e)),this}rotate(t){return this.premultiply(ir.makeRotation(-t)),this}translate(t,e){return this.premultiply(ir.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ir=new Nt;function Hc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Vs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fh(){const i=Vs("canvas");return i.style.display="block",i}const ho={};function Us(i){i in ho||(ho[i]=!0,console.warn(i))}function dh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ph(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function mh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const uo=new Nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),fo=new Nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Hi={[On]:{transfer:Bs,primaries:Hs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[ke]:{transfer:ie,primaries:Hs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[qs]:{transfer:Bs,primaries:ks,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(fo),fromReference:i=>i.applyMatrix3(uo)},[Oa]:{transfer:ie,primaries:ks,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(fo),fromReference:i=>i.applyMatrix3(uo).convertLinearToSRGB()}},gh=new Set([On,qs]),$t={enabled:!0,_workingColorSpace:On,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!gh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Hi[t].toReference,s=Hi[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Hi[i].primaries},getTransfer:function(i){return i===wn?Bs:Hi[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Hi[t].luminanceCoefficients)}};function Ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function sr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ii;class _h{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ii===void 0&&(ii=Vs("canvas")),ii.width=t.width,ii.height=t.height;const n=ii.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Vs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ri(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ri(e[n]/255)*255):e[n]=Ri(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vh=0;class kc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=Dn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(rr(s[a].image)):r.push(rr(s[a]))}else r=rr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function rr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_h.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xh=0;class Re extends Fi{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,n=jn,s=jn,r=je,a=Jn,o=Je,c=_n,l=Re.DEFAULT_ANISOTROPY,h=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=Dn(),this.name="",this.source=new kc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zs:t.x=t.x-Math.floor(t.x);break;case jn:t.x=t.x<0?0:1;break;case jr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zs:t.y=t.y-Math.floor(t.y);break;case jn:t.y=t.y<0?0:1;break;case jr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=wc;Re.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,n=0,s=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],f=c[8],p=c[1],m=c[5],_=c[9],M=c[2],d=c[6],u=c[10];if(Math.abs(h-p)<.01&&Math.abs(f-M)<.01&&Math.abs(_-d)<.01){if(Math.abs(h+p)<.1&&Math.abs(f+M)<.1&&Math.abs(_+d)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,A=(m+1)/2,U=(u+1)/2,w=(h+p)/4,b=(f+M)/4,I=(_+d)/4;return y>A&&y>U?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=b/n):A>U?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=w/s,r=I/s):U<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(U),n=b/r,s=I/r),this.set(n,s,r,e),this}let E=Math.sqrt((d-_)*(d-_)+(f-M)*(f-M)+(p-h)*(p-h));return Math.abs(E)<.001&&(E=1),this.x=(d-_)/E,this.y=(f-M)/E,this.z=(p-h)/E,this.w=Math.acos((l+m+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mh extends Fi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Re(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new kc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends Mh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Gc extends Re{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sh extends Re{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class es{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const p=r[a+0],m=r[a+1],_=r[a+2],M=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=_,t[e+3]=M;return}if(f!==M||c!==p||l!==m||h!==_){let d=1-o;const u=c*p+l*m+h*_+f*M,E=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const U=Math.sqrt(y),w=Math.atan2(U,u*E);d=Math.sin(d*w)/U,o=Math.sin(o*w)/U}const A=o*E;if(c=c*d+p*A,l=l*d+m*A,h=h*d+_*A,f=f*d+M*A,d===1-o){const U=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=U,l*=U,h*=U,f*=U}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[a],p=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+h*f+c*m-l*p,t[e+1]=c*_+h*p+l*f-o*m,t[e+2]=l*_+h*m+o*p-c*f,t[e+3]=h*_-o*f-c*p-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),f=o(r/2),p=c(n/2),m=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=p*h*f+l*m*_,this._y=l*m*f-p*h*_,this._z=l*h*_+p*m*f,this._w=l*h*f-p*m*_;break;case"YXZ":this._x=p*h*f+l*m*_,this._y=l*m*f-p*h*_,this._z=l*h*_-p*m*f,this._w=l*h*f+p*m*_;break;case"ZXY":this._x=p*h*f-l*m*_,this._y=l*m*f+p*h*_,this._z=l*h*_+p*m*f,this._w=l*h*f-p*m*_;break;case"ZYX":this._x=p*h*f-l*m*_,this._y=l*m*f+p*h*_,this._z=l*h*_-p*m*f,this._w=l*h*f+p*m*_;break;case"YZX":this._x=p*h*f+l*m*_,this._y=l*m*f+p*h*_,this._z=l*h*_-p*m*f,this._w=l*h*f-p*m*_;break;case"XZY":this._x=p*h*f-l*m*_,this._y=l*m*f-p*h*_,this._z=l*h*_+p*m*f,this._w=l*h*f+p*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],f=e[10],p=n+o+f;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>f){const m=2*Math.sqrt(1+n-o-f);this._w=(h-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-n-f);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+f-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),f=Math.sin((1-e)*h)/l,p=Math.sin(e*h)/l;return this._w=a*f+this._w*p,this._x=n*f+this._x*p,this._y=s*f+this._y*p,this._z=r*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(po.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(po.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=s+c*f+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ar.copy(this).projectOnVector(t),this.sub(ar)}reflect(t){return this.sub(ar.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ar=new R,po=new es;class rn{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ye.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ye.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ye.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ye):Ye.fromBufferAttribute(r,a),Ye.applyMatrix4(t.matrixWorld),this.expandByPoint(Ye);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rs.copy(n.boundingBox)),rs.applyMatrix4(t.matrixWorld),this.union(rs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ye),Ye.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ki),as.subVectors(this.max,ki),si.subVectors(t.a,ki),ri.subVectors(t.b,ki),ai.subVectors(t.c,ki),xn.subVectors(ri,si),Mn.subVectors(ai,ri),kn.subVectors(si,ai);let e=[0,-xn.z,xn.y,0,-Mn.z,Mn.y,0,-kn.z,kn.y,xn.z,0,-xn.x,Mn.z,0,-Mn.x,kn.z,0,-kn.x,-xn.y,xn.x,0,-Mn.y,Mn.x,0,-kn.y,kn.x,0];return!or(e,si,ri,ai,as)||(e=[1,0,0,0,1,0,0,0,1],!or(e,si,ri,ai,as))?!1:(os.crossVectors(xn,Mn),e=[os.x,os.y,os.z],or(e,si,ri,ai,as))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ye).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ye).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const cn=[new R,new R,new R,new R,new R,new R,new R,new R],Ye=new R,rs=new rn,si=new R,ri=new R,ai=new R,xn=new R,Mn=new R,kn=new R,ki=new R,as=new R,os=new R,Gn=new R;function or(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Gn.fromArray(i,r);const o=s.x*Math.abs(Gn.x)+s.y*Math.abs(Gn.y)+s.z*Math.abs(Gn.z),c=t.dot(Gn),l=e.dot(Gn),h=n.dot(Gn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const yh=new rn,Gi=new R,cr=new R;class za{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gi.subVectors(t,this.center);const e=Gi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Gi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(cr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gi.copy(t.center).add(cr)),this.expandByPoint(Gi.copy(t.center).sub(cr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ln=new R,lr=new R,cs=new R,Sn=new R,hr=new R,ls=new R,ur=new R;class Vc{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ln.copy(this.origin).addScaledVector(this.direction,e),ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){lr.copy(t).add(e).multiplyScalar(.5),cs.copy(e).sub(t).normalize(),Sn.copy(this.origin).sub(lr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(cs),o=Sn.dot(this.direction),c=-Sn.dot(cs),l=Sn.lengthSq(),h=Math.abs(1-a*a);let f,p,m,_;if(h>0)if(f=a*c-o,p=a*o-c,_=r*h,f>=0)if(p>=-_)if(p<=_){const M=1/h;f*=M,p*=M,m=f*(f+a*p+2*o)+p*(a*f+p+2*c)+l}else p=r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*c)+l;else p=-r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*c)+l;else p<=-_?(f=Math.max(0,-(-a*r+o)),p=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+p*(p+2*c)+l):p<=_?(f=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(f=Math.max(0,-(a*r+o)),p=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+p*(p+2*c)+l);else p=a>0?-r:r,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(lr).addScaledVector(cs,p),m}intersectSphere(t,e){ln.subVectors(t.center,this.origin);const n=ln.dot(this.direction),s=ln.dot(ln)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),h>=0?(r=(t.min.y-p.y)*h,a=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,a=(t.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-p.z)*f,c=(t.max.z-p.z)*f):(o=(t.max.z-p.z)*f,c=(t.min.z-p.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ln)!==null}intersectTriangle(t,e,n,s,r){hr.subVectors(e,t),ls.subVectors(n,t),ur.crossVectors(hr,ls);let a=this.direction.dot(ur),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Sn.subVectors(this.origin,t);const c=o*this.direction.dot(ls.crossVectors(Sn,ls));if(c<0)return null;const l=o*this.direction.dot(hr.cross(Sn));if(l<0||c+l>a)return null;const h=-o*Sn.dot(ur);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,s,r,a,o,c,l,h,f,p,m,_,M,d){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,f,p,m,_,M,d)}set(t,e,n,s,r,a,o,c,l,h,f,p,m,_,M,d){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=h,u[10]=f,u[14]=p,u[3]=m,u[7]=_,u[11]=M,u[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/oi.setFromMatrixColumn(t,0).length(),r=1/oi.setFromMatrixColumn(t,1).length(),a=1/oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const p=a*h,m=a*f,_=o*h,M=o*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=m+_*l,e[5]=p-M*l,e[9]=-o*c,e[2]=M-p*l,e[6]=_+m*l,e[10]=a*c}else if(t.order==="YXZ"){const p=c*h,m=c*f,_=l*h,M=l*f;e[0]=p+M*o,e[4]=_*o-m,e[8]=a*l,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=m*o-_,e[6]=M+p*o,e[10]=a*c}else if(t.order==="ZXY"){const p=c*h,m=c*f,_=l*h,M=l*f;e[0]=p-M*o,e[4]=-a*f,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*h,e[9]=M-p*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const p=a*h,m=a*f,_=o*h,M=o*f;e[0]=c*h,e[4]=_*l-m,e[8]=p*l+M,e[1]=c*f,e[5]=M*l+p,e[9]=m*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const p=a*c,m=a*l,_=o*c,M=o*l;e[0]=c*h,e[4]=M-p*f,e[8]=_*f+m,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=m*f+_,e[10]=p-M*f}else if(t.order==="XZY"){const p=a*c,m=a*l,_=o*c,M=o*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=p*f+M,e[5]=a*h,e[9]=m*f-_,e[2]=_*f-m,e[6]=o*h,e[10]=M*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Eh,t,Th)}lookAt(t,e,n){const s=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),yn.crossVectors(n,Fe),yn.lengthSq()===0&&(Math.abs(n.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),yn.crossVectors(n,Fe)),yn.normalize(),hs.crossVectors(Fe,yn),s[0]=yn.x,s[4]=hs.x,s[8]=Fe.x,s[1]=yn.y,s[5]=hs.y,s[9]=Fe.y,s[2]=yn.z,s[6]=hs.z,s[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],p=n[9],m=n[13],_=n[2],M=n[6],d=n[10],u=n[14],E=n[3],y=n[7],A=n[11],U=n[15],w=s[0],b=s[4],I=s[8],j=s[12],g=s[1],S=s[5],N=s[9],O=s[13],V=s[2],q=s[6],k=s[10],Y=s[14],G=s[3],lt=s[7],ft=s[11],vt=s[15];return r[0]=a*w+o*g+c*V+l*G,r[4]=a*b+o*S+c*q+l*lt,r[8]=a*I+o*N+c*k+l*ft,r[12]=a*j+o*O+c*Y+l*vt,r[1]=h*w+f*g+p*V+m*G,r[5]=h*b+f*S+p*q+m*lt,r[9]=h*I+f*N+p*k+m*ft,r[13]=h*j+f*O+p*Y+m*vt,r[2]=_*w+M*g+d*V+u*G,r[6]=_*b+M*S+d*q+u*lt,r[10]=_*I+M*N+d*k+u*ft,r[14]=_*j+M*O+d*Y+u*vt,r[3]=E*w+y*g+A*V+U*G,r[7]=E*b+y*S+A*q+U*lt,r[11]=E*I+y*N+A*k+U*ft,r[15]=E*j+y*O+A*Y+U*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],f=t[6],p=t[10],m=t[14],_=t[3],M=t[7],d=t[11],u=t[15];return _*(+r*c*f-s*l*f-r*o*p+n*l*p+s*o*m-n*c*m)+M*(+e*c*m-e*l*p+r*a*p-s*a*m+s*l*h-r*c*h)+d*(+e*l*f-e*o*m-r*a*f+n*a*m+r*o*h-n*l*h)+u*(-s*o*h-e*c*f+e*o*p+s*a*f-n*a*p+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],f=t[9],p=t[10],m=t[11],_=t[12],M=t[13],d=t[14],u=t[15],E=f*d*l-M*p*l+M*c*m-o*d*m-f*c*u+o*p*u,y=_*p*l-h*d*l-_*c*m+a*d*m+h*c*u-a*p*u,A=h*M*l-_*f*l+_*o*m-a*M*m-h*o*u+a*f*u,U=_*f*c-h*M*c-_*o*p+a*M*p+h*o*d-a*f*d,w=e*E+n*y+s*A+r*U;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return t[0]=E*b,t[1]=(M*p*r-f*d*r-M*s*m+n*d*m+f*s*u-n*p*u)*b,t[2]=(o*d*r-M*c*r+M*s*l-n*d*l-o*s*u+n*c*u)*b,t[3]=(f*c*r-o*p*r-f*s*l+n*p*l+o*s*m-n*c*m)*b,t[4]=y*b,t[5]=(h*d*r-_*p*r+_*s*m-e*d*m-h*s*u+e*p*u)*b,t[6]=(_*c*r-a*d*r-_*s*l+e*d*l+a*s*u-e*c*u)*b,t[7]=(a*p*r-h*c*r+h*s*l-e*p*l-a*s*m+e*c*m)*b,t[8]=A*b,t[9]=(_*f*r-h*M*r-_*n*m+e*M*m+h*n*u-e*f*u)*b,t[10]=(a*M*r-_*o*r+_*n*l-e*M*l-a*n*u+e*o*u)*b,t[11]=(h*o*r-a*f*r-h*n*l+e*f*l+a*n*m-e*o*m)*b,t[12]=U*b,t[13]=(h*M*s-_*f*s+_*n*p-e*M*p-h*n*d+e*f*d)*b,t[14]=(_*o*s-a*M*s-_*n*c+e*M*c+a*n*d-e*o*d)*b,t[15]=(a*f*s-h*o*s+h*n*c-e*f*c-a*n*p+e*o*p)*b,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,f=o+o,p=r*l,m=r*h,_=r*f,M=a*h,d=a*f,u=o*f,E=c*l,y=c*h,A=c*f,U=n.x,w=n.y,b=n.z;return s[0]=(1-(M+u))*U,s[1]=(m+A)*U,s[2]=(_-y)*U,s[3]=0,s[4]=(m-A)*w,s[5]=(1-(p+u))*w,s[6]=(d+E)*w,s[7]=0,s[8]=(_+y)*b,s[9]=(d-E)*b,s[10]=(1-(p+M))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=oi.set(s[0],s[1],s[2]).length();const a=oi.set(s[4],s[5],s[6]).length(),o=oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ke.copy(this);const l=1/r,h=1/a,f=1/o;return Ke.elements[0]*=l,Ke.elements[1]*=l,Ke.elements[2]*=l,Ke.elements[4]*=h,Ke.elements[5]*=h,Ke.elements[6]*=h,Ke.elements[8]*=f,Ke.elements[9]*=f,Ke.elements[10]*=f,e.setFromRotationMatrix(Ke),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=mn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),p=(n+s)/(n-s);let m,_;if(o===mn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Gs)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=mn){const c=this.elements,l=1/(e-t),h=1/(n-s),f=1/(a-r),p=(e+t)*l,m=(n+s)*h;let _,M;if(o===mn)_=(a+r)*f,M=-2*f;else if(o===Gs)_=r*f,M=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=M,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const oi=new R,Ke=new se,Eh=new R(0,0,0),Th=new R(1,1,1),yn=new R,hs=new R,Fe=new R,mo=new se,go=new es;class an{constructor(t=0,e=0,n=0,s=an.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],f=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Le(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Le(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return mo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(mo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return go.setFromEuler(this),this.setFromQuaternion(go,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class Ba{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ah=0;const _o=new R,ci=new es,hn=new se,us=new R,Vi=new R,bh=new R,wh=new es,vo=new R(1,0,0),xo=new R(0,1,0),Mo=new R(0,0,1),So={type:"added"},Rh={type:"removed"},li={type:"childadded",child:null},fr={type:"childremoved",child:null};class ge extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new R,e=new an,n=new es,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Nt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ba,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.multiply(ci),this}rotateOnWorldAxis(t,e){return ci.setFromAxisAngle(t,e),this.quaternion.premultiply(ci),this}rotateX(t){return this.rotateOnAxis(vo,t)}rotateY(t){return this.rotateOnAxis(xo,t)}rotateZ(t){return this.rotateOnAxis(Mo,t)}translateOnAxis(t,e){return _o.copy(t).applyQuaternion(this.quaternion),this.position.add(_o.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(vo,t)}translateY(t){return this.translateOnAxis(xo,t)}translateZ(t){return this.translateOnAxis(Mo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?us.copy(t):us.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(Vi,us,this.up):hn.lookAt(us,Vi,this.up),this.quaternion.setFromRotationMatrix(hn),s&&(hn.extractRotation(s.matrixWorld),ci.setFromRotationMatrix(hn),this.quaternion.premultiply(ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(So),li.child=t,this.dispatchEvent(li),li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rh),fr.child=t,this.dispatchEvent(fr),fr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hn.multiply(t.parent.matrixWorld)),t.applyMatrix4(hn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(So),li.child=t,this.dispatchEvent(li),li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,t,bh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,wh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),f=a(t.shapes),p=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ge.DEFAULT_UP=new R(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $e=new R,un=new R,dr=new R,fn=new R,hi=new R,ui=new R,yo=new R,pr=new R,mr=new R,gr=new R,_r=new Jt,vr=new Jt,xr=new Jt;class Ge{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),$e.subVectors(t,e),s.cross($e);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){$e.subVectors(s,e),un.subVectors(n,e),dr.subVectors(t,e);const a=$e.dot($e),o=$e.dot(un),c=$e.dot(dr),l=un.dot(un),h=un.dot(dr),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const p=1/f,m=(l*c-o*h)*p,_=(a*h-o*c)*p;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fn.x),c.addScaledVector(a,fn.y),c.addScaledVector(o,fn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return _r.setScalar(0),vr.setScalar(0),xr.setScalar(0),_r.fromBufferAttribute(t,e),vr.fromBufferAttribute(t,n),xr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(_r,r.x),a.addScaledVector(vr,r.y),a.addScaledVector(xr,r.z),a}static isFrontFacing(t,e,n,s){return $e.subVectors(n,e),un.subVectors(t,e),$e.cross(un).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $e.subVectors(this.c,this.b),un.subVectors(this.a,this.b),$e.cross(un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ge.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ge.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ge.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ge.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ge.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;hi.subVectors(s,n),ui.subVectors(r,n),pr.subVectors(t,n);const c=hi.dot(pr),l=ui.dot(pr);if(c<=0&&l<=0)return e.copy(n);mr.subVectors(t,s);const h=hi.dot(mr),f=ui.dot(mr);if(h>=0&&f<=h)return e.copy(s);const p=c*f-h*l;if(p<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(hi,a);gr.subVectors(t,r);const m=hi.dot(gr),_=ui.dot(gr);if(_>=0&&m<=_)return e.copy(r);const M=m*l-c*_;if(M<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(ui,o);const d=h*_-m*f;if(d<=0&&f-h>=0&&m-_>=0)return yo.subVectors(r,s),o=(f-h)/(f-h+(m-_)),e.copy(s).addScaledVector(yo,o);const u=1/(d+M+p);return a=M*u,o=p*u,e.copy(n).addScaledVector(hi,a).addScaledVector(ui,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},En={h:0,s:0,l:0},fs={h:0,s:0,l:0};function Mr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=uh(t,1),e=Le(e,0,1),n=Le(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Mr(a,r,t+1/3),this.g=Mr(a,r,t),this.b=Mr(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=Wc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}copyLinearToSRGB(t){return this.r=sr(t.r),this.g=sr(t.g),this.b=sr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return $t.fromWorkingColorSpace(ye.copy(this),t),Math.round(Le(ye.r*255,0,255))*65536+Math.round(Le(ye.g*255,0,255))*256+Math.round(Le(ye.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(ye.copy(this),e);const n=ye.r,s=ye.g,r=ye.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(ye.copy(this),e),t.r=ye.r,t.g=ye.g,t.b=ye.b,t}getStyle(t=ke){$t.fromWorkingColorSpace(ye.copy(this),t);const e=ye.r,n=ye.g,s=ye.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(En),this.setHSL(En.h+t,En.s+e,En.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(En),t.getHSL(fs);const n=nr(En.h,fs.h,e),s=nr(En.s,fs.s,e),r=nr(En.l,fs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ye=new Bt;Bt.NAMES=Wc;let Ch=0;class Oi extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=bi,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=kr,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=co,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==Un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hr&&(n.blendSrc=this.blendSrc),this.blendDst!==kr&&(n.blendDst=this.blendDst),this.blendEquation!==$n&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==co&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Qe extends Oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const le=new R,ds=new Dt;class tn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ta,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ds.fromBufferAttribute(this,e),ds.applyMatrix3(t),this.setXY(e,ds.x,ds.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix3(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix4(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyNormalMatrix(t),this.setXYZ(e,le.x,le.y,le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.transformDirection(t),this.setXYZ(e,le.x,le.y,le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=sn(e,this.array)),e}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=sn(e,this.array)),e}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=sn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=sn(e,this.array)),e}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array),r=jt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ta&&(t.usage=this.usage),t}}class Xc extends tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class qc extends tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class fe extends tn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ph=0;const He=new se,Sr=new ge,fi=new R,Oe=new rn,Wi=new rn,me=new R;class We extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hc(t)?qc:Xc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return He.makeRotationFromQuaternion(t),this.applyMatrix4(He),this}rotateX(t){return He.makeRotationX(t),this.applyMatrix4(He),this}rotateY(t){return He.makeRotationY(t),this.applyMatrix4(He),this}rotateZ(t){return He.makeRotationZ(t),this.applyMatrix4(He),this}translate(t,e,n){return He.makeTranslation(t,e,n),this.applyMatrix4(He),this}scale(t,e,n){return He.makeScale(t,e,n),this.applyMatrix4(He),this}lookAt(t){return Sr.lookAt(t),Sr.updateMatrix(),this.applyMatrix4(Sr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new fe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Oe.setFromBufferAttribute(r),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,Oe.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,Oe.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(Oe.min),this.boundingBox.expandByPoint(Oe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new za);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(Oe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Wi.setFromBufferAttribute(o),this.morphTargetsRelative?(me.addVectors(Oe.min,Wi.min),Oe.expandByPoint(me),me.addVectors(Oe.max,Wi.max),Oe.expandByPoint(me)):(Oe.expandByPoint(Wi.min),Oe.expandByPoint(Wi.max))}Oe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)me.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)me.fromBufferAttribute(o,l),c&&(fi.fromBufferAttribute(t,l),me.add(fi)),s=Math.max(s,n.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new R,c[I]=new R;const l=new R,h=new R,f=new R,p=new Dt,m=new Dt,_=new Dt,M=new R,d=new R;function u(I,j,g){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,j),f.fromBufferAttribute(n,g),p.fromBufferAttribute(r,I),m.fromBufferAttribute(r,j),_.fromBufferAttribute(r,g),h.sub(l),f.sub(l),m.sub(p),_.sub(p);const S=1/(m.x*_.y-_.x*m.y);isFinite(S)&&(M.copy(h).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(S),d.copy(f).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(S),o[I].add(M),o[j].add(M),o[g].add(M),c[I].add(d),c[j].add(d),c[g].add(d))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,j=E.length;I<j;++I){const g=E[I],S=g.start,N=g.count;for(let O=S,V=S+N;O<V;O+=3)u(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const y=new R,A=new R,U=new R,w=new R;function b(I){U.fromBufferAttribute(s,I),w.copy(U);const j=o[I];y.copy(j),y.sub(U.multiplyScalar(U.dot(j))).normalize(),A.crossVectors(w,j);const S=A.dot(c[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,S)}for(let I=0,j=E.length;I<j;++I){const g=E[I],S=g.start,N=g.count;for(let O=S,V=S+N;O<V;O+=3)b(t.getX(O+0)),b(t.getX(O+1)),b(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new R,r=new R,a=new R,o=new R,c=new R,l=new R,h=new R,f=new R;if(t)for(let p=0,m=t.count;p<m;p+=3){const _=t.getX(p+0),M=t.getX(p+1),d=t.getX(p+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,d),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,d),o.add(h),c.add(h),l.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,f=o.normalized,p=new l.constructor(c.length*h);let m=0,_=0;for(let M=0,d=c.length;M<d;M++){o.isInterleavedBufferAttribute?m=c[M]*o.data.stride+o.offset:m=c[M]*h;for(let u=0;u<h;u++)p[_++]=l[m++]}return new tn(p,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){const p=l[h],m=t(p,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,p=l.length;f<p;f++){const m=l[f];h.push(m.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],f=r[l];for(let p=0,m=f.length;p<m;p++)h.push(f[p].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Eo=new se,Vn=new Vc,ps=new za,To=new R,ms=new R,gs=new R,_s=new R,yr=new R,vs=new R,Ao=new R,xs=new R;class Ft extends ge{constructor(t=new We,e=new Qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){vs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],f=r[c];h!==0&&(yr.fromBufferAttribute(f,t),a?vs.addScaledVector(yr,h):vs.addScaledVector(yr.sub(e),h))}e.add(vs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(r),Vn.copy(t.ray).recast(t.near),!(ps.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(ps,To)===null||Vn.origin.distanceToSquared(To)>(t.far-t.near)**2))&&(Eo.copy(r).invert(),Vn.copy(t.ray).applyMatrix4(Eo),!(n.boundingBox!==null&&Vn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=p.length;_<M;_++){const d=p[_],u=a[d.materialIndex],E=Math.max(d.start,m.start),y=Math.min(o.count,Math.min(d.start+d.count,m.start+m.count));for(let A=E,U=y;A<U;A+=3){const w=o.getX(A),b=o.getX(A+1),I=o.getX(A+2);s=Ms(this,u,t,n,l,h,f,w,b,I),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let d=_,u=M;d<u;d+=3){const E=o.getX(d),y=o.getX(d+1),A=o.getX(d+2);s=Ms(this,a,t,n,l,h,f,E,y,A),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,M=p.length;_<M;_++){const d=p[_],u=a[d.materialIndex],E=Math.max(d.start,m.start),y=Math.min(c.count,Math.min(d.start+d.count,m.start+m.count));for(let A=E,U=y;A<U;A+=3){const w=A,b=A+1,I=A+2;s=Ms(this,u,t,n,l,h,f,w,b,I),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let d=_,u=M;d<u;d+=3){const E=d,y=d+1,A=d+2;s=Ms(this,a,t,n,l,h,f,E,y,A),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}}}function Lh(i,t,e,n,s,r,a,o){let c;if(t.side===Ie?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Un,o),c===null)return null;xs.copy(o),xs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(xs);return l<e.near||l>e.far?null:{distance:l,point:xs.clone(),object:i}}function Ms(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,ms),i.getVertexPosition(c,gs),i.getVertexPosition(l,_s);const h=Lh(i,t,e,n,ms,gs,_s,Ao);if(h){const f=new R;Ge.getBarycoord(Ao,ms,gs,_s,f),s&&(h.uv=Ge.getInterpolatedAttribute(s,o,c,l,f,new Dt)),r&&(h.uv1=Ge.getInterpolatedAttribute(r,o,c,l,f,new Dt)),a&&(h.normal=Ge.getInterpolatedAttribute(a,o,c,l,f,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a:o,b:c,c:l,normal:new R,materialIndex:0};Ge.getNormal(ms,gs,_s,p.normal),h.face=p,h.barycoord=f}return h}class ve extends We{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],f=[];let p=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(f,2));function _(M,d,u,E,y,A,U,w,b,I,j){const g=A/b,S=U/I,N=A/2,O=U/2,V=w/2,q=b+1,k=I+1;let Y=0,G=0;const lt=new R;for(let ft=0;ft<k;ft++){const vt=ft*S-O;for(let it=0;it<q;it++){const gt=it*g-N;lt[M]=gt*E,lt[d]=vt*y,lt[u]=V,l.push(lt.x,lt.y,lt.z),lt[M]=0,lt[d]=0,lt[u]=w>0?1:-1,h.push(lt.x,lt.y,lt.z),f.push(it/b),f.push(1-ft/I),Y+=1}}for(let ft=0;ft<I;ft++)for(let vt=0;vt<b;vt++){const it=p+vt+q*ft,gt=p+vt+q*(ft+1),B=p+(vt+1)+q*(ft+1),X=p+(vt+1)+q*ft;c.push(it,gt,X),c.push(gt,B,X),G+=6}o.addGroup(m,G,j),m+=G,p+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ve(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ui(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ae(i){const t={};for(let e=0;e<i.length;e++){const n=Ui(i[e]);for(const s in n)t[s]=n[s]}return t}function Dh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Yc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const Ih={clone:Ui,merge:Ae};var Uh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nn extends Oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uh,this.fragmentShader=Nh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ui(t.uniforms),this.uniformsGroups=Dh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Kc extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=mn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tn=new R,bo=new Dt,wo=new Dt;class ze extends Kc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Aa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Aa*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z)}getViewSize(t,e){return this.getViewBounds(t,bo,wo),e.subVectors(wo,bo)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(er*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const di=-90,pi=1;class Fh extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ze(di,pi,t,e);s.layers=this.layers,this.add(s);const r=new ze(di,pi,t,e);r.layers=this.layers,this.add(r);const a=new ze(di,pi,t,e);a.layers=this.layers,this.add(a);const o=new ze(di,pi,t,e);o.layers=this.layers,this.add(o);const c=new ze(di,pi,t,e);c.layers=this.layers,this.add(c);const l=new ze(di,pi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,p,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class $c extends Re{constructor(t,e,n,s,r,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Pi,super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Oh extends ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new $c(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ve(5,5,5),r=new Nn({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:Pn});r.uniforms.tEquirect.value=e;const a=new Ft(s,r),o=e.minFilter;return e.minFilter===Jn&&(e.minFilter=je),new Fh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Er=new R,zh=new R,Bh=new Nt;class An{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Er.subVectors(n,e).cross(zh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Er),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Bh.getNormalMatrix(t),s=this.coplanarPoint(Er).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new za,Ss=new R;class Ha{constructor(t=new An,e=new An,n=new An,s=new An,r=new An,a=new An){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],f=s[6],p=s[7],m=s[8],_=s[9],M=s[10],d=s[11],u=s[12],E=s[13],y=s[14],A=s[15];if(n[0].setComponents(c-r,p-l,d-m,A-u).normalize(),n[1].setComponents(c+r,p+l,d+m,A+u).normalize(),n[2].setComponents(c+a,p+h,d+_,A+E).normalize(),n[3].setComponents(c-a,p-h,d-_,A-E).normalize(),n[4].setComponents(c-o,p-f,d-M,A-y).normalize(),e===mn)n[5].setComponents(c+o,p+f,d+M,A+y).normalize();else if(e===Gs)n[5].setComponents(o,f,M,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(t){return Wn.center.set(0,0,0),Wn.radius=.7071067811865476,Wn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ss.x=s.normal.x>0?t.max.x:t.min.x,Ss.y=s.normal.y>0?t.max.y:t.min.y,Ss.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zc(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Hh(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,f=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,h);else{f.sort((m,_)=>m.start-_.start);let p=0;for(let m=1;m<f.length;m++){const _=f[p],M=f[m];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++p,f[p]=M)}f.length=p+1;for(let m=0,_=f.length;m<_;m++){const M=f[m];i.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Rn extends We{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,f=t/o,p=e/c,m=[],_=[],M=[],d=[];for(let u=0;u<h;u++){const E=u*p-a;for(let y=0;y<l;y++){const A=y*f-r;_.push(A,-E,0),M.push(0,0,1),d.push(y/o),d.push(1-u/c)}}for(let u=0;u<c;u++)for(let E=0;E<o;E++){const y=E+l*u,A=E+l*(u+1),U=E+1+l*(u+1),w=E+1+l*u;m.push(y,A,w),m.push(A,U,w)}this.setIndex(m),this.setAttribute("position",new fe(_,3)),this.setAttribute("normal",new fe(M,3)),this.setAttribute("uv",new fe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rn(t.width,t.height,t.widthSegments,t.heightSegments)}}var kh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$h=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Zh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,eu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ru=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,au=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,hu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,uu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,du=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_u="gl_FragColor = linearToOutputTexel( gl_FragColor );",vu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Mu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Su=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Eu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Tu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Au=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ru=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Du=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Iu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Uu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ou=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ku=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ku=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$u=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Zu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ju=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ju=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ef=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,af=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ff=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,df=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_f=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ef=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Tf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,If=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ff=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$f=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,td=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ed=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,nd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,id=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ad=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,od=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ld=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ud=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,md=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_d=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Md=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:kh,alphahash_pars_fragment:Gh,alphamap_fragment:Vh,alphamap_pars_fragment:Wh,alphatest_fragment:Xh,alphatest_pars_fragment:qh,aomap_fragment:Yh,aomap_pars_fragment:Kh,batching_pars_vertex:$h,batching_vertex:Zh,begin_vertex:jh,beginnormal_vertex:Jh,bsdfs:Qh,iridescence_fragment:tu,bumpmap_pars_fragment:eu,clipping_planes_fragment:nu,clipping_planes_pars_fragment:iu,clipping_planes_pars_vertex:su,clipping_planes_vertex:ru,color_fragment:au,color_pars_fragment:ou,color_pars_vertex:cu,color_vertex:lu,common:hu,cube_uv_reflection_fragment:uu,defaultnormal_vertex:fu,displacementmap_pars_vertex:du,displacementmap_vertex:pu,emissivemap_fragment:mu,emissivemap_pars_fragment:gu,colorspace_fragment:_u,colorspace_pars_fragment:vu,envmap_fragment:xu,envmap_common_pars_fragment:Mu,envmap_pars_fragment:Su,envmap_pars_vertex:yu,envmap_physical_pars_fragment:Iu,envmap_vertex:Eu,fog_vertex:Tu,fog_pars_vertex:Au,fog_fragment:bu,fog_pars_fragment:wu,gradientmap_pars_fragment:Ru,lightmap_pars_fragment:Cu,lights_lambert_fragment:Pu,lights_lambert_pars_fragment:Lu,lights_pars_begin:Du,lights_toon_fragment:Uu,lights_toon_pars_fragment:Nu,lights_phong_fragment:Fu,lights_phong_pars_fragment:Ou,lights_physical_fragment:zu,lights_physical_pars_fragment:Bu,lights_fragment_begin:Hu,lights_fragment_maps:ku,lights_fragment_end:Gu,logdepthbuf_fragment:Vu,logdepthbuf_pars_fragment:Wu,logdepthbuf_pars_vertex:Xu,logdepthbuf_vertex:qu,map_fragment:Yu,map_pars_fragment:Ku,map_particle_fragment:$u,map_particle_pars_fragment:Zu,metalnessmap_fragment:ju,metalnessmap_pars_fragment:Ju,morphinstance_vertex:Qu,morphcolor_vertex:tf,morphnormal_vertex:ef,morphtarget_pars_vertex:nf,morphtarget_vertex:sf,normal_fragment_begin:rf,normal_fragment_maps:af,normal_pars_fragment:of,normal_pars_vertex:cf,normal_vertex:lf,normalmap_pars_fragment:hf,clearcoat_normal_fragment_begin:uf,clearcoat_normal_fragment_maps:ff,clearcoat_pars_fragment:df,iridescence_pars_fragment:pf,opaque_fragment:mf,packing:gf,premultiplied_alpha_fragment:_f,project_vertex:vf,dithering_fragment:xf,dithering_pars_fragment:Mf,roughnessmap_fragment:Sf,roughnessmap_pars_fragment:yf,shadowmap_pars_fragment:Ef,shadowmap_pars_vertex:Tf,shadowmap_vertex:Af,shadowmask_pars_fragment:bf,skinbase_vertex:wf,skinning_pars_vertex:Rf,skinning_vertex:Cf,skinnormal_vertex:Pf,specularmap_fragment:Lf,specularmap_pars_fragment:Df,tonemapping_fragment:If,tonemapping_pars_fragment:Uf,transmission_fragment:Nf,transmission_pars_fragment:Ff,uv_pars_fragment:Of,uv_pars_vertex:zf,uv_vertex:Bf,worldpos_vertex:Hf,background_vert:kf,background_frag:Gf,backgroundCube_vert:Vf,backgroundCube_frag:Wf,cube_vert:Xf,cube_frag:qf,depth_vert:Yf,depth_frag:Kf,distanceRGBA_vert:$f,distanceRGBA_frag:Zf,equirect_vert:jf,equirect_frag:Jf,linedashed_vert:Qf,linedashed_frag:td,meshbasic_vert:ed,meshbasic_frag:nd,meshlambert_vert:id,meshlambert_frag:sd,meshmatcap_vert:rd,meshmatcap_frag:ad,meshnormal_vert:od,meshnormal_frag:cd,meshphong_vert:ld,meshphong_frag:hd,meshphysical_vert:ud,meshphysical_frag:fd,meshtoon_vert:dd,meshtoon_frag:pd,points_vert:md,points_frag:gd,shadow_vert:_d,shadow_frag:vd,sprite_vert:xd,sprite_frag:Md},rt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},en={basic:{uniforms:Ae([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Ae([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Ae([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Ae([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Ae([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Ae([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Ae([rt.points,rt.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Ae([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Ae([rt.common,rt.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Ae([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Ae([rt.sprite,rt.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:Ae([rt.common,rt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:Ae([rt.lights,rt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};en.physical={uniforms:Ae([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const ys={r:0,b:0,g:0},Xn=new an,Sd=new se;function yd(i,t,e,n,s,r,a){const o=new Bt(0);let c=r===!0?0:1,l,h,f=null,p=0,m=null;function _(E){let y=E.isScene===!0?E.background:null;return y&&y.isTexture&&(y=(E.backgroundBlurriness>0?e:t).get(y)),y}function M(E){let y=!1;const A=_(E);A===null?u(o,c):A&&A.isColor&&(u(A,1),y=!0);const U=i.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,a):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(E,y){const A=_(y);A&&(A.isCubeTexture||A.mapping===Xs)?(h===void 0&&(h=new Ft(new ve(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Ui(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(U,w,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Xn.copy(y.backgroundRotation),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Sd.makeRotationFromEuler(Xn)),h.material.toneMapped=$t.getTransfer(A.colorSpace)!==ie,(f!==A||p!==A.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,f=A,p=A.version,m=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Ft(new Rn(2,2),new Nn({name:"BackgroundMaterial",uniforms:Ui(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=$t.getTransfer(A.colorSpace)!==ie,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(f!==A||p!==A.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,f=A,p=A.version,m=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function u(E,y){E.getRGB(ys,Yc(i)),n.buffers.color.setClear(ys.r,ys.g,ys.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(E,y=1){o.set(E),c=y,u(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,u(o,c)},render:M,addToRenderList:d}}function Ed(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(g,S,N,O,V){let q=!1;const k=f(O,N,S);r!==k&&(r=k,l(r.object)),q=m(g,O,N,V),q&&_(g,O,N,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,A(g,S,N,O),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(g){return i.bindVertexArray(g)}function h(g){return i.deleteVertexArray(g)}function f(g,S,N){const O=N.wireframe===!0;let V=n[g.id];V===void 0&&(V={},n[g.id]=V);let q=V[S.id];q===void 0&&(q={},V[S.id]=q);let k=q[O];return k===void 0&&(k=p(c()),q[O]=k),k}function p(g){const S=[],N=[],O=[];for(let V=0;V<e;V++)S[V]=0,N[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:N,attributeDivisors:O,object:g,attributes:{},index:null}}function m(g,S,N,O){const V=r.attributes,q=S.attributes;let k=0;const Y=N.getAttributes();for(const G in Y)if(Y[G].location>=0){const ft=V[G];let vt=q[G];if(vt===void 0&&(G==="instanceMatrix"&&g.instanceMatrix&&(vt=g.instanceMatrix),G==="instanceColor"&&g.instanceColor&&(vt=g.instanceColor)),ft===void 0||ft.attribute!==vt||vt&&ft.data!==vt.data)return!0;k++}return r.attributesNum!==k||r.index!==O}function _(g,S,N,O){const V={},q=S.attributes;let k=0;const Y=N.getAttributes();for(const G in Y)if(Y[G].location>=0){let ft=q[G];ft===void 0&&(G==="instanceMatrix"&&g.instanceMatrix&&(ft=g.instanceMatrix),G==="instanceColor"&&g.instanceColor&&(ft=g.instanceColor));const vt={};vt.attribute=ft,ft&&ft.data&&(vt.data=ft.data),V[G]=vt,k++}r.attributes=V,r.attributesNum=k,r.index=O}function M(){const g=r.newAttributes;for(let S=0,N=g.length;S<N;S++)g[S]=0}function d(g){u(g,0)}function u(g,S){const N=r.newAttributes,O=r.enabledAttributes,V=r.attributeDivisors;N[g]=1,O[g]===0&&(i.enableVertexAttribArray(g),O[g]=1),V[g]!==S&&(i.vertexAttribDivisor(g,S),V[g]=S)}function E(){const g=r.newAttributes,S=r.enabledAttributes;for(let N=0,O=S.length;N<O;N++)S[N]!==g[N]&&(i.disableVertexAttribArray(N),S[N]=0)}function y(g,S,N,O,V,q,k){k===!0?i.vertexAttribIPointer(g,S,N,V,q):i.vertexAttribPointer(g,S,N,O,V,q)}function A(g,S,N,O){M();const V=O.attributes,q=N.getAttributes(),k=S.defaultAttributeValues;for(const Y in q){const G=q[Y];if(G.location>=0){let lt=V[Y];if(lt===void 0&&(Y==="instanceMatrix"&&g.instanceMatrix&&(lt=g.instanceMatrix),Y==="instanceColor"&&g.instanceColor&&(lt=g.instanceColor)),lt!==void 0){const ft=lt.normalized,vt=lt.itemSize,it=t.get(lt);if(it===void 0)continue;const gt=it.buffer,B=it.type,X=it.bytesPerElement,nt=B===i.INT||B===i.UNSIGNED_INT||lt.gpuType===La;if(lt.isInterleavedBufferAttribute){const st=lt.data,Mt=st.stride,Tt=lt.offset;if(st.isInstancedInterleavedBuffer){for(let zt=0;zt<G.locationSize;zt++)u(G.location+zt,st.meshPerAttribute);g.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let zt=0;zt<G.locationSize;zt++)d(G.location+zt);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let zt=0;zt<G.locationSize;zt++)y(G.location+zt,vt/G.locationSize,B,ft,Mt*X,(Tt+vt/G.locationSize*zt)*X,nt)}else{if(lt.isInstancedBufferAttribute){for(let st=0;st<G.locationSize;st++)u(G.location+st,lt.meshPerAttribute);g.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let st=0;st<G.locationSize;st++)d(G.location+st);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let st=0;st<G.locationSize;st++)y(G.location+st,vt/G.locationSize,B,ft,vt*X,vt/G.locationSize*st*X,nt)}}else if(k!==void 0){const ft=k[Y];if(ft!==void 0)switch(ft.length){case 2:i.vertexAttrib2fv(G.location,ft);break;case 3:i.vertexAttrib3fv(G.location,ft);break;case 4:i.vertexAttrib4fv(G.location,ft);break;default:i.vertexAttrib1fv(G.location,ft)}}}}E()}function U(){I();for(const g in n){const S=n[g];for(const N in S){const O=S[N];for(const V in O)h(O[V].object),delete O[V];delete S[N]}delete n[g]}}function w(g){if(n[g.id]===void 0)return;const S=n[g.id];for(const N in S){const O=S[N];for(const V in O)h(O[V].object),delete O[V];delete S[N]}delete n[g.id]}function b(g){for(const S in n){const N=n[S];if(N[g.id]===void 0)continue;const O=N[g.id];for(const V in O)h(O[V].object),delete O[V];delete N[g.id]}}function I(){j(),a=!0,r!==s&&(r=s,l(r.object))}function j(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:j,dispose:U,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:M,enableAttribute:d,disableUnusedAttributes:E}}function Td(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),e.update(h,n,f))}function o(l,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let m=0;for(let _=0;_<f;_++)m+=h[_];e.update(m,n,1)}function c(l,h,f,p){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<l.length;_++)a(l[_],h[_],p[_]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,f);let _=0;for(let M=0;M<f;M++)_+=h[M];for(let M=0;M<p.length;M++)e.update(_,n,p[M])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Ad(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==Je&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const I=b===ts&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==_n&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==pn&&!I)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(p===!0){const b=t.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),U=_>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:d,maxAttributes:u,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:A,vertexTextures:U,maxSamples:w}}function bd(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new An,o=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const m=f.length!==0||p||n!==0||s;return s=p,n=f.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,p){e=h(f,p,0)},this.setState=function(f,p,m){const _=f.clippingPlanes,M=f.clipIntersection,d=f.clipShadows,u=i.get(f);if(!s||_===null||_.length===0||r&&!d)r?h(null):l();else{const E=r?0:n,y=E*4;let A=u.clippingState||null;c.value=A,A=h(_,p,y,m);for(let U=0;U!==y;++U)A[U]=e[U];u.clippingState=A,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,p,m,_){const M=f!==null?f.length:0;let d=null;if(M!==0){if(d=c.value,_!==!0||d===null){const u=m+M*4,E=p.matrixWorldInverse;o.getNormalMatrix(E),(d===null||d.length<u)&&(d=new Float32Array(u));for(let y=0,A=m;y!==M;++y,A+=4)a.copy(f[y]).applyMatrix4(E,o),a.normal.toArray(d,A),d[A+3]=a.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,d}}function wd(i){let t=new WeakMap;function e(a,o){return o===$r?a.mapping=Pi:o===Zr&&(a.mapping=Li),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===$r||o===Zr)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Oh(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class jc extends Kc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ei=4,Ro=[.125,.215,.35,.446,.526,.582],Zn=20,Tr=new jc,Co=new Bt;let Ar=null,br=0,wr=0,Rr=!1;const Kn=(1+Math.sqrt(5))/2,mi=1/Kn,Po=[new R(-Kn,mi,0),new R(Kn,mi,0),new R(-mi,0,Kn),new R(mi,0,Kn),new R(0,Kn,-mi),new R(0,Kn,mi),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class Lo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ar=this._renderer.getRenderTarget(),br=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),Rr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Io(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ar,br,wr),this._renderer.xr.enabled=Rr,t.scissorTest=!1,Es(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pi||t.mapping===Li?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ar=this._renderer.getRenderTarget(),br=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),Rr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:ts,format:Je,colorSpace:On,depthBuffer:!1},s=Do(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Do(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rd(r)),this._blurMaterial=Cd(r,t,e)}return s}_compileMaterial(t){const e=new Ft(this._lodPlanes[0],t);this._renderer.compile(e,Tr)}_sceneToCubeUV(t,e,n,s){const o=new ze(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(Co),h.toneMapping=Ln,h.autoClear=!1;const m=new Qe({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),_=new Ft(new ve,m);let M=!1;const d=t.background;d?d.isColor&&(m.color.copy(d),t.background=null,M=!0):(m.color.copy(Co),M=!0);for(let u=0;u<6;u++){const E=u%3;E===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):E===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const y=this._cubeSize;Es(s,E*y,u>2?y:0,y,y),h.setRenderTarget(s),M&&h.render(_,o),h.render(t,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=p,h.autoClear=f,t.background=d}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Pi||t.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Io());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ft(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Es(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Tr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Po[(s-r-1)%Po.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Ft(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Zn-1),M=r/_,d=isFinite(r)?1+Math.floor(h*M):Zn;d>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Zn}`);const u=[];let E=0;for(let b=0;b<Zn;++b){const I=b/M,j=Math.exp(-I*I/2);u.push(j),b===0?E+=j:b<d&&(E+=2*j)}for(let b=0;b<u.length;b++)u[b]=u[b]/E;p.envMap.value=t.texture,p.samples.value=d,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:y}=this;p.dTheta.value=_,p.mipInt.value=y-n;const A=this._sizeLods[s],U=3*A*(s>y-Ei?s-y+Ei:0),w=4*(this._cubeSize-A);Es(e,U,w,3*A,2*A),c.setRenderTarget(e),c.render(f,Tr)}}function Rd(i){const t=[],e=[],n=[];let s=i;const r=i-Ei+1+Ro.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Ei?c=Ro[a-i+Ei-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,f=1+l,p=[h,h,f,h,f,f,h,h,f,f,h,f],m=6,_=6,M=3,d=2,u=1,E=new Float32Array(M*_*m),y=new Float32Array(d*_*m),A=new Float32Array(u*_*m);for(let w=0;w<m;w++){const b=w%3*2/3-1,I=w>2?0:-1,j=[b,I,0,b+2/3,I,0,b+2/3,I+1,0,b,I,0,b+2/3,I+1,0,b,I+1,0];E.set(j,M*_*w),y.set(p,d*_*w);const g=[w,w,w,w,w,w];A.set(g,u*_*w)}const U=new We;U.setAttribute("position",new tn(E,M)),U.setAttribute("uv",new tn(y,d)),U.setAttribute("faceIndex",new tn(A,u)),t.push(U),s>Ei&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Do(i,t,e){const n=new ti(i,t,e);return n.texture.mapping=Xs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Es(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Cd(i,t,e){const n=new Float32Array(Zn),s=new R(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Io(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Uo(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function ka(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pd(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===$r||c===Zr,h=c===Pi||c===Li;if(l||h){let f=t.get(o);const p=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new Lo(i)),f=l?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const m=o.image;return l&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new Lo(i)),f=l?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Ld(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Us("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Dd(i,t,e,n){const s={},r=new WeakMap;function a(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);for(const _ in p.morphAttributes){const M=p.morphAttributes[_];for(let d=0,u=M.length;d<u;d++)t.remove(M[d])}p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(f,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function c(f){const p=f.attributes;for(const _ in p)t.update(p[_],i.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const M=m[_];for(let d=0,u=M.length;d<u;d++)t.update(M[d],i.ARRAY_BUFFER)}}function l(f){const p=[],m=f.index,_=f.attributes.position;let M=0;if(m!==null){const E=m.array;M=m.version;for(let y=0,A=E.length;y<A;y+=3){const U=E[y+0],w=E[y+1],b=E[y+2];p.push(U,w,w,b,b,U)}}else if(_!==void 0){const E=_.array;M=_.version;for(let y=0,A=E.length/3-1;y<A;y+=3){const U=y+0,w=y+1,b=y+2;p.push(U,w,w,b,b,U)}}else return;const d=new(Hc(p)?qc:Xc)(p,1);d.version=M;const u=r.get(f);u&&t.remove(u),r.set(f,d)}function h(f){const p=r.get(f);if(p){const m=f.index;m!==null&&p.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function Id(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,m){i.drawElements(n,m,r,p*a),e.update(m,n,1)}function l(p,m,_){_!==0&&(i.drawElementsInstanced(n,m,r,p*a,_),e.update(m,n,_))}function h(p,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,_);let d=0;for(let u=0;u<_;u++)d+=m[u];e.update(d,n,1)}function f(p,m,_,M){if(_===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let u=0;u<p.length;u++)l(p[u]/a,m[u],M[u]);else{d.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,M,0,_);let u=0;for(let E=0;E<_;E++)u+=m[E];for(let E=0;E<M.length;E++)e.update(u,n,M[E])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Ud(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Nd(i,t,e){const n=new WeakMap,s=new Jt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let p=n.get(o);if(p===void 0||p.count!==f){let g=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",g)};var m=g;p!==void 0&&p.texture.dispose();const _=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,d=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let A=0;_===!0&&(A=1),M===!0&&(A=2),d===!0&&(A=3);let U=o.attributes.position.count*A,w=1;U>t.maxTextureSize&&(w=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const b=new Float32Array(U*w*4*f),I=new Gc(b,U,w,f);I.type=pn,I.needsUpdate=!0;const j=A*4;for(let S=0;S<f;S++){const N=u[S],O=E[S],V=y[S],q=U*w*4*S;for(let k=0;k<N.count;k++){const Y=k*j;_===!0&&(s.fromBufferAttribute(N,k),b[q+Y+0]=s.x,b[q+Y+1]=s.y,b[q+Y+2]=s.z,b[q+Y+3]=0),M===!0&&(s.fromBufferAttribute(O,k),b[q+Y+4]=s.x,b[q+Y+5]=s.y,b[q+Y+6]=s.z,b[q+Y+7]=0),d===!0&&(s.fromBufferAttribute(V,k),b[q+Y+8]=s.x,b[q+Y+9]=s.y,b[q+Y+10]=s.z,b[q+Y+11]=V.itemSize===4?s.w:1)}}p={count:f,texture:I,size:new Dt(U,w)},n.set(o,p),o.addEventListener("dispose",g)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let _=0;for(let d=0;d<l.length;d++)_+=l[d];const M=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",M),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Fd(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return f}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Jc extends Re{constructor(t,e,n,s,r,a,o,c,l,h=wi){if(h!==wi&&h!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===wi&&(n=Qn),n===void 0&&h===Ii&&(n=Di),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ve,this.minFilter=c!==void 0?c:Ve,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Qc=new Re,No=new Jc(1,1),tl=new Gc,el=new Sh,nl=new $c,Fo=[],Oo=[],zo=new Float32Array(16),Bo=new Float32Array(9),Ho=new Float32Array(4);function zi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Fo[s];if(r===void 0&&(r=new Float32Array(s),Fo[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function de(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ys(i,t){let e=Oo[t];e===void 0&&(e=new Int32Array(t),Oo[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Od(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function zd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2fv(this.addr,t),pe(e,t)}}function Bd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(de(e,t))return;i.uniform3fv(this.addr,t),pe(e,t)}}function Hd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4fv(this.addr,t),pe(e,t)}}function kd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),pe(e,t)}else{if(de(e,n))return;Ho.set(n),i.uniformMatrix2fv(this.addr,!1,Ho),pe(e,n)}}function Gd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),pe(e,t)}else{if(de(e,n))return;Bo.set(n),i.uniformMatrix3fv(this.addr,!1,Bo),pe(e,n)}}function Vd(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(de(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),pe(e,t)}else{if(de(e,n))return;zo.set(n),i.uniformMatrix4fv(this.addr,!1,zo),pe(e,n)}}function Wd(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Xd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2iv(this.addr,t),pe(e,t)}}function qd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;i.uniform3iv(this.addr,t),pe(e,t)}}function Yd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4iv(this.addr,t),pe(e,t)}}function Kd(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function $d(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(de(e,t))return;i.uniform2uiv(this.addr,t),pe(e,t)}}function Zd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(de(e,t))return;i.uniform3uiv(this.addr,t),pe(e,t)}}function jd(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(de(e,t))return;i.uniform4uiv(this.addr,t),pe(e,t)}}function Jd(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(No.compareFunction=Bc,r=No):r=Qc,e.setTexture2D(t||r,s)}function Qd(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||el,s)}function tp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||nl,s)}function ep(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||tl,s)}function np(i){switch(i){case 5126:return Od;case 35664:return zd;case 35665:return Bd;case 35666:return Hd;case 35674:return kd;case 35675:return Gd;case 35676:return Vd;case 5124:case 35670:return Wd;case 35667:case 35671:return Xd;case 35668:case 35672:return qd;case 35669:case 35673:return Yd;case 5125:return Kd;case 36294:return $d;case 36295:return Zd;case 36296:return jd;case 35678:case 36198:case 36298:case 36306:case 35682:return Jd;case 35679:case 36299:case 36307:return Qd;case 35680:case 36300:case 36308:case 36293:return tp;case 36289:case 36303:case 36311:case 36292:return ep}}function ip(i,t){i.uniform1fv(this.addr,t)}function sp(i,t){const e=zi(t,this.size,2);i.uniform2fv(this.addr,e)}function rp(i,t){const e=zi(t,this.size,3);i.uniform3fv(this.addr,e)}function ap(i,t){const e=zi(t,this.size,4);i.uniform4fv(this.addr,e)}function op(i,t){const e=zi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function cp(i,t){const e=zi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function lp(i,t){const e=zi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function hp(i,t){i.uniform1iv(this.addr,t)}function up(i,t){i.uniform2iv(this.addr,t)}function fp(i,t){i.uniform3iv(this.addr,t)}function dp(i,t){i.uniform4iv(this.addr,t)}function pp(i,t){i.uniform1uiv(this.addr,t)}function mp(i,t){i.uniform2uiv(this.addr,t)}function gp(i,t){i.uniform3uiv(this.addr,t)}function _p(i,t){i.uniform4uiv(this.addr,t)}function vp(i,t,e){const n=this.cache,s=t.length,r=Ys(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Qc,r[a])}function xp(i,t,e){const n=this.cache,s=t.length,r=Ys(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||el,r[a])}function Mp(i,t,e){const n=this.cache,s=t.length,r=Ys(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||nl,r[a])}function Sp(i,t,e){const n=this.cache,s=t.length,r=Ys(e,s);de(n,r)||(i.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||tl,r[a])}function yp(i){switch(i){case 5126:return ip;case 35664:return sp;case 35665:return rp;case 35666:return ap;case 35674:return op;case 35675:return cp;case 35676:return lp;case 5124:case 35670:return hp;case 35667:case 35671:return up;case 35668:case 35672:return fp;case 35669:case 35673:return dp;case 5125:return pp;case 36294:return mp;case 36295:return gp;case 36296:return _p;case 35678:case 36198:case 36298:case 36306:case 35682:return vp;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return Mp;case 36289:case 36303:case 36311:case 36292:return Sp}}class Ep{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=np(e.type)}}class Tp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=yp(e.type)}}class Ap{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Cr=/(\w+)(\])?(\[|\.)?/g;function ko(i,t){i.seq.push(t),i.map[t.id]=t}function bp(i,t,e){const n=i.name,s=n.length;for(Cr.lastIndex=0;;){const r=Cr.exec(n),a=Cr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){ko(e,l===void 0?new Ep(o,i,t):new Tp(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new Ap(o),ko(e,f)),e=f}}}class Ns{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);bp(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Go(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const wp=37297;let Rp=0;function Cp(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Pp(i){const t=$t.getPrimaries($t.workingColorSpace),e=$t.getPrimaries(i);let n;switch(t===e?n="":t===ks&&e===Hs?n="LinearDisplayP3ToLinearSRGB":t===Hs&&e===ks&&(n="LinearSRGBToLinearDisplayP3"),i){case On:case qs:return[n,"LinearTransferOETF"];case ke:case Oa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Vo(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Cp(i.getShaderSource(t),a)}else return s}function Lp(i,t){const e=Pp(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Dp(i,t){let e;switch(t){case Kl:e="Linear";break;case $l:e="Reinhard";break;case Zl:e="Cineon";break;case bc:e="ACESFilmic";break;case Jl:e="AgX";break;case Ql:e="Neutral";break;case jl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ts=new R;function Ip(){$t.getLuminanceCoefficients(Ts);const i=Ts.x.toFixed(4),t=Ts.y.toFixed(4),e=Ts.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Up(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zi).join(`
`)}function Np(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Fp(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Zi(i){return i!==""}function Wo(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xo(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Op=/^[ \t]*#include +<([\w\d./]+)>/gm;function ba(i){return i.replace(Op,Bp)}const zp=new Map;function Bp(i,t){let e=Ut[t];if(e===void 0){const n=zp.get(t);if(n!==void 0)e=Ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ba(e)}const Hp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qo(i){return i.replace(Hp,kp)}function kp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yo(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Gp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ec?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Tc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dn&&(t="SHADOWMAP_TYPE_VSM"),t}function Vp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Pi:case Li:t="ENVMAP_TYPE_CUBE";break;case Xs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Wp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Li:t="ENVMAP_MODE_REFRACTION";break}return t}function Xp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ac:t="ENVMAP_BLENDING_MULTIPLY";break;case ql:t="ENVMAP_BLENDING_MIX";break;case Yl:t="ENVMAP_BLENDING_ADD";break}return t}function qp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Yp(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Gp(e),l=Vp(e),h=Wp(e),f=Xp(e),p=qp(e),m=Up(e),_=Np(r),M=s.createProgram();let d,u,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Zi).join(`
`),d.length>0&&(d+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Zi).join(`
`),u.length>0&&(u+=`
`)):(d=[Yo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),u=[Yo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?Ut.tonemapping_pars_fragment:"",e.toneMapping!==Ln?Dp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,Lp("linearToOutputTexel",e.outputColorSpace),Ip(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zi).join(`
`)),a=ba(a),a=Wo(a,e),a=Xo(a,e),o=ba(o),o=Wo(o,e),o=Xo(o,e),a=qo(a),o=qo(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,d=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,u=["#define varying in",e.glslVersion===lo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=E+d+a,A=E+u+o,U=Go(s,s.VERTEX_SHADER,y),w=Go(s,s.FRAGMENT_SHADER,A);s.attachShader(M,U),s.attachShader(M,w),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function b(S){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(M).trim(),O=s.getShaderInfoLog(U).trim(),V=s.getShaderInfoLog(w).trim();let q=!0,k=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,U,w);else{const Y=Vo(s,U,"vertex"),G=Vo(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+N+`
`+Y+`
`+G)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(O===""||V==="")&&(k=!1);k&&(S.diagnostics={runnable:q,programLog:N,vertexShader:{log:O,prefix:d},fragmentShader:{log:V,prefix:u}})}s.deleteShader(U),s.deleteShader(w),I=new Ns(s,M),j=Fp(s,M)}let I;this.getUniforms=function(){return I===void 0&&b(this),I};let j;this.getAttributes=function(){return j===void 0&&b(this),j};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(M,wp)),g},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Rp++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=U,this.fragmentShader=w,this}let Kp=0;class $p{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Zp(t),e.set(t,n)),n}}class Zp{constructor(t){this.id=Kp++,this.code=t,this.usedTimes=0}}function jp(i,t,e,n,s,r,a){const o=new Ba,c=new $p,l=new Set,h=[],f=s.logarithmicDepthBuffer,p=s.reverseDepthBuffer,m=s.vertexTextures;let _=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(g){return l.add(g),g===0?"uv":`uv${g}`}function u(g,S,N,O,V){const q=O.fog,k=V.geometry,Y=g.isMeshStandardMaterial?O.environment:null,G=(g.isMeshStandardMaterial?e:t).get(g.envMap||Y),lt=G&&G.mapping===Xs?G.image.height:null,ft=M[g.type];g.precision!==null&&(_=s.getMaxPrecision(g.precision),_!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",_,"instead."));const vt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,it=vt!==void 0?vt.length:0;let gt=0;k.morphAttributes.position!==void 0&&(gt=1),k.morphAttributes.normal!==void 0&&(gt=2),k.morphAttributes.color!==void 0&&(gt=3);let B,X,nt,st;if(ft){const Pe=en[ft];B=Pe.vertexShader,X=Pe.fragmentShader}else B=g.vertexShader,X=g.fragmentShader,c.update(g),nt=c.getVertexShaderID(g),st=c.getFragmentShaderID(g);const Mt=i.getRenderTarget(),Tt=V.isInstancedMesh===!0,zt=V.isBatchedMesh===!0,qt=!!g.map,Ht=!!g.matcap,C=!!G,Me=!!g.aoMap,Ot=!!g.lightMap,Vt=!!g.bumpMap,wt=!!g.normalMap,ee=!!g.displacementMap,Pt=!!g.emissiveMap,T=!!g.metalnessMap,v=!!g.roughnessMap,F=g.anisotropy>0,Z=g.clearcoat>0,Q=g.dispersion>0,$=g.iridescence>0,St=g.sheen>0,at=g.transmission>0,dt=F&&!!g.anisotropyMap,Wt=Z&&!!g.clearcoatMap,tt=Z&&!!g.clearcoatNormalMap,pt=Z&&!!g.clearcoatRoughnessMap,Rt=$&&!!g.iridescenceMap,Ct=$&&!!g.iridescenceThicknessMap,mt=St&&!!g.sheenColorMap,kt=St&&!!g.sheenRoughnessMap,Lt=!!g.specularMap,te=!!g.specularColorMap,P=!!g.specularIntensityMap,ht=at&&!!g.transmissionMap,W=at&&!!g.thicknessMap,J=!!g.gradientMap,ot=!!g.alphaMap,ut=g.alphaTest>0,Gt=!!g.alphaHash,ce=!!g.extensions;let Ce=Ln;g.toneMapped&&(Mt===null||Mt.isXRRenderTarget===!0)&&(Ce=i.toneMapping);const Xt={shaderID:ft,shaderType:g.type,shaderName:g.name,vertexShader:B,fragmentShader:X,defines:g.defines,customVertexShaderID:nt,customFragmentShaderID:st,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:_,batching:zt,batchingColor:zt&&V._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&V.instanceColor!==null,instancingMorph:Tt&&V.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Mt===null?i.outputColorSpace:Mt.isXRRenderTarget===!0?Mt.texture.colorSpace:On,alphaToCoverage:!!g.alphaToCoverage,map:qt,matcap:Ht,envMap:C,envMapMode:C&&G.mapping,envMapCubeUVHeight:lt,aoMap:Me,lightMap:Ot,bumpMap:Vt,normalMap:wt,displacementMap:m&&ee,emissiveMap:Pt,normalMapObjectSpace:wt&&g.normalMapType===ih,normalMapTangentSpace:wt&&g.normalMapType===zc,metalnessMap:T,roughnessMap:v,anisotropy:F,anisotropyMap:dt,clearcoat:Z,clearcoatMap:Wt,clearcoatNormalMap:tt,clearcoatRoughnessMap:pt,dispersion:Q,iridescence:$,iridescenceMap:Rt,iridescenceThicknessMap:Ct,sheen:St,sheenColorMap:mt,sheenRoughnessMap:kt,specularMap:Lt,specularColorMap:te,specularIntensityMap:P,transmission:at,transmissionMap:ht,thicknessMap:W,gradientMap:J,opaque:g.transparent===!1&&g.blending===bi&&g.alphaToCoverage===!1,alphaMap:ot,alphaTest:ut,alphaHash:Gt,combine:g.combine,mapUv:qt&&d(g.map.channel),aoMapUv:Me&&d(g.aoMap.channel),lightMapUv:Ot&&d(g.lightMap.channel),bumpMapUv:Vt&&d(g.bumpMap.channel),normalMapUv:wt&&d(g.normalMap.channel),displacementMapUv:ee&&d(g.displacementMap.channel),emissiveMapUv:Pt&&d(g.emissiveMap.channel),metalnessMapUv:T&&d(g.metalnessMap.channel),roughnessMapUv:v&&d(g.roughnessMap.channel),anisotropyMapUv:dt&&d(g.anisotropyMap.channel),clearcoatMapUv:Wt&&d(g.clearcoatMap.channel),clearcoatNormalMapUv:tt&&d(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&d(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&d(g.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&d(g.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&d(g.sheenColorMap.channel),sheenRoughnessMapUv:kt&&d(g.sheenRoughnessMap.channel),specularMapUv:Lt&&d(g.specularMap.channel),specularColorMapUv:te&&d(g.specularColorMap.channel),specularIntensityMapUv:P&&d(g.specularIntensityMap.channel),transmissionMapUv:ht&&d(g.transmissionMap.channel),thicknessMapUv:W&&d(g.thicknessMap.channel),alphaMapUv:ot&&d(g.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(wt||F),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!k.attributes.uv&&(qt||ot),fog:!!q,useFog:g.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:p,skinning:V.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:gt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ce,decodeVideoTexture:qt&&g.map.isVideoTexture===!0&&$t.getTransfer(g.map.colorSpace)===ie,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Ze,flipSided:g.side===Ie,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ce&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ce&&g.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Xt.vertexUv1s=l.has(1),Xt.vertexUv2s=l.has(2),Xt.vertexUv3s=l.has(3),l.clear(),Xt}function E(g){const S=[];if(g.shaderID?S.push(g.shaderID):(S.push(g.customVertexShaderID),S.push(g.customFragmentShaderID)),g.defines!==void 0)for(const N in g.defines)S.push(N),S.push(g.defines[N]);return g.isRawShaderMaterial===!1&&(y(S,g),A(S,g),S.push(i.outputColorSpace)),S.push(g.customProgramCacheKey),S.join()}function y(g,S){g.push(S.precision),g.push(S.outputColorSpace),g.push(S.envMapMode),g.push(S.envMapCubeUVHeight),g.push(S.mapUv),g.push(S.alphaMapUv),g.push(S.lightMapUv),g.push(S.aoMapUv),g.push(S.bumpMapUv),g.push(S.normalMapUv),g.push(S.displacementMapUv),g.push(S.emissiveMapUv),g.push(S.metalnessMapUv),g.push(S.roughnessMapUv),g.push(S.anisotropyMapUv),g.push(S.clearcoatMapUv),g.push(S.clearcoatNormalMapUv),g.push(S.clearcoatRoughnessMapUv),g.push(S.iridescenceMapUv),g.push(S.iridescenceThicknessMapUv),g.push(S.sheenColorMapUv),g.push(S.sheenRoughnessMapUv),g.push(S.specularMapUv),g.push(S.specularColorMapUv),g.push(S.specularIntensityMapUv),g.push(S.transmissionMapUv),g.push(S.thicknessMapUv),g.push(S.combine),g.push(S.fogExp2),g.push(S.sizeAttenuation),g.push(S.morphTargetsCount),g.push(S.morphAttributeCount),g.push(S.numDirLights),g.push(S.numPointLights),g.push(S.numSpotLights),g.push(S.numSpotLightMaps),g.push(S.numHemiLights),g.push(S.numRectAreaLights),g.push(S.numDirLightShadows),g.push(S.numPointLightShadows),g.push(S.numSpotLightShadows),g.push(S.numSpotLightShadowsWithMaps),g.push(S.numLightProbes),g.push(S.shadowMapType),g.push(S.toneMapping),g.push(S.numClippingPlanes),g.push(S.numClipIntersection),g.push(S.depthPacking)}function A(g,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),g.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),g.push(o.mask)}function U(g){const S=M[g.type];let N;if(S){const O=en[S];N=Ih.clone(O.uniforms)}else N=g.uniforms;return N}function w(g,S){let N;for(let O=0,V=h.length;O<V;O++){const q=h[O];if(q.cacheKey===S){N=q,++N.usedTimes;break}}return N===void 0&&(N=new Yp(i,S,g,r),h.push(N)),N}function b(g){if(--g.usedTimes===0){const S=h.indexOf(g);h[S]=h[h.length-1],h.pop(),g.destroy()}}function I(g){c.remove(g)}function j(){c.dispose()}return{getParameters:u,getProgramCacheKey:E,getUniforms:U,acquireProgram:w,releaseProgram:b,releaseShaderCache:I,programs:h,dispose:j}}function Jp(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Qp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ko(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function $o(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f,p,m,_,M,d){let u=i[t];return u===void 0?(u={id:f.id,object:f,geometry:p,material:m,groupOrder:_,renderOrder:f.renderOrder,z:M,group:d},i[t]=u):(u.id=f.id,u.object=f,u.geometry=p,u.material=m,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=M,u.group=d),t++,u}function o(f,p,m,_,M,d){const u=a(f,p,m,_,M,d);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):e.push(u)}function c(f,p,m,_,M,d){const u=a(f,p,m,_,M,d);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):e.unshift(u)}function l(f,p){e.length>1&&e.sort(f||Qp),n.length>1&&n.sort(p||Ko),s.length>1&&s.sort(p||Ko)}function h(){for(let f=t,p=i.length;f<p;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function tm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new $o,i.set(n,[a])):s>=r.length?(a=new $o,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function em(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Bt};break;case"SpotLight":e={position:new R,direction:new R,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function nm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let im=0;function sm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function rm(i){const t=new em,e=nm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const s=new R,r=new se,a=new se;function o(l){let h=0,f=0,p=0;for(let j=0;j<9;j++)n.probe[j].set(0,0,0);let m=0,_=0,M=0,d=0,u=0,E=0,y=0,A=0,U=0,w=0,b=0;l.sort(sm);for(let j=0,g=l.length;j<g;j++){const S=l[j],N=S.color,O=S.intensity,V=S.distance,q=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=N.r*O,f+=N.g*O,p+=N.b*O;else if(S.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(S.sh.coefficients[k],O);b++}else if(S.isDirectionalLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const Y=S.shadow,G=e.get(S);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=q,n.directionalShadowMatrix[m]=S.shadow.matrix,E++}n.directional[m]=k,m++}else if(S.isSpotLight){const k=t.get(S);k.position.setFromMatrixPosition(S.matrixWorld),k.color.copy(N).multiplyScalar(O),k.distance=V,k.coneCos=Math.cos(S.angle),k.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),k.decay=S.decay,n.spot[M]=k;const Y=S.shadow;if(S.map&&(n.spotLightMap[U]=S.map,U++,Y.updateMatrices(S),S.castShadow&&w++),n.spotLightMatrix[M]=Y.matrix,S.castShadow){const G=e.get(S);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.spotShadow[M]=G,n.spotShadowMap[M]=q,A++}M++}else if(S.isRectAreaLight){const k=t.get(S);k.color.copy(N).multiplyScalar(O),k.halfWidth.set(S.width*.5,0,0),k.halfHeight.set(0,S.height*.5,0),n.rectArea[d]=k,d++}else if(S.isPointLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),k.distance=S.distance,k.decay=S.decay,S.castShadow){const Y=S.shadow,G=e.get(S);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,G.shadowCameraNear=Y.camera.near,G.shadowCameraFar=Y.camera.far,n.pointShadow[_]=G,n.pointShadowMap[_]=q,n.pointShadowMatrix[_]=S.shadow.matrix,y++}n.point[_]=k,_++}else if(S.isHemisphereLight){const k=t.get(S);k.skyColor.copy(S.color).multiplyScalar(O),k.groundColor.copy(S.groundColor).multiplyScalar(O),n.hemi[u]=k,u++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=p;const I=n.hash;(I.directionalLength!==m||I.pointLength!==_||I.spotLength!==M||I.rectAreaLength!==d||I.hemiLength!==u||I.numDirectionalShadows!==E||I.numPointShadows!==y||I.numSpotShadows!==A||I.numSpotMaps!==U||I.numLightProbes!==b)&&(n.directional.length=m,n.spot.length=M,n.rectArea.length=d,n.point.length=_,n.hemi.length=u,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=A+U-w,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,I.directionalLength=m,I.pointLength=_,I.spotLength=M,I.rectAreaLength=d,I.hemiLength=u,I.numDirectionalShadows=E,I.numPointShadows=y,I.numSpotShadows=A,I.numSpotMaps=U,I.numLightProbes=b,n.version=im++)}function c(l,h){let f=0,p=0,m=0,_=0,M=0;const d=h.matrixWorldInverse;for(let u=0,E=l.length;u<E;u++){const y=l[u];if(y.isDirectionalLight){const A=n.directional[f];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),f++}else if(y.isSpotLight){const A=n.spot[m];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),m++}else if(y.isRectAreaLight){const A=n.rectArea[_];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),a.identity(),r.copy(y.matrixWorld),r.premultiply(d),a.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const A=n.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const A=n.hemi[M];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(d),M++}}}return{setup:o,setupView:c,state:n}}function Zo(i){const t=new rm(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function am(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Zo(i),t.set(s,[o])):r>=a.length?(o=new Zo(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class om extends Oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class cm extends Oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function um(i,t,e){let n=new Ha;const s=new Dt,r=new Dt,a=new Jt,o=new om({depthPacking:nh}),c=new cm,l={},h=e.maxTextureSize,f={[Un]:Ie,[Ie]:Un,[Ze]:Ze},p=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:lm,fragmentShader:hm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const _=new We;_.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Ft(_,p),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ec;let u=this.type;this.render=function(w,b,I){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;const j=i.getRenderTarget(),g=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Pn),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=u!==dn&&this.type===dn,V=u===dn&&this.type!==dn;for(let q=0,k=w.length;q<k;q++){const Y=w[q],G=Y.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const lt=G.getFrameExtents();if(s.multiply(lt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/lt.x),s.x=r.x*lt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/lt.y),s.y=r.y*lt.y,G.mapSize.y=r.y)),G.map===null||O===!0||V===!0){const vt=this.type!==dn?{minFilter:Ve,magFilter:Ve}:{};G.map!==null&&G.map.dispose(),G.map=new ti(s.x,s.y,vt),G.map.texture.name=Y.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const ft=G.getViewportCount();for(let vt=0;vt<ft;vt++){const it=G.getViewport(vt);a.set(r.x*it.x,r.y*it.y,r.x*it.z,r.y*it.w),N.viewport(a),G.updateMatrices(Y,vt),n=G.getFrustum(),A(b,I,G.camera,Y,this.type)}G.isPointLightShadow!==!0&&this.type===dn&&E(G,I),G.needsUpdate=!1}u=this.type,d.needsUpdate=!1,i.setRenderTarget(j,g,S)};function E(w,b){const I=t.update(M);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ti(s.x,s.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(b,null,I,p,M,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(b,null,I,m,M,null)}function y(w,b,I,j){let g=null;const S=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(S!==void 0)g=S;else if(g=I.isPointLight===!0?c:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const N=g.uuid,O=b.uuid;let V=l[N];V===void 0&&(V={},l[N]=V);let q=V[O];q===void 0&&(q=g.clone(),V[O]=q,b.addEventListener("dispose",U)),g=q}if(g.visible=b.visible,g.wireframe=b.wireframe,j===dn?g.side=b.shadowSide!==null?b.shadowSide:b.side:g.side=b.shadowSide!==null?b.shadowSide:f[b.side],g.alphaMap=b.alphaMap,g.alphaTest=b.alphaTest,g.map=b.map,g.clipShadows=b.clipShadows,g.clippingPlanes=b.clippingPlanes,g.clipIntersection=b.clipIntersection,g.displacementMap=b.displacementMap,g.displacementScale=b.displacementScale,g.displacementBias=b.displacementBias,g.wireframeLinewidth=b.wireframeLinewidth,g.linewidth=b.linewidth,I.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const N=i.properties.get(g);N.light=I}return g}function A(w,b,I,j,g){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&g===dn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const O=t.update(w),V=w.material;if(Array.isArray(V)){const q=O.groups;for(let k=0,Y=q.length;k<Y;k++){const G=q[k],lt=V[G.materialIndex];if(lt&&lt.visible){const ft=y(w,lt,j,g);w.onBeforeShadow(i,w,b,I,O,ft,G),i.renderBufferDirect(I,null,O,ft,w,G),w.onAfterShadow(i,w,b,I,O,ft,G)}}}else if(V.visible){const q=y(w,V,j,g);w.onBeforeShadow(i,w,b,I,O,q,null),i.renderBufferDirect(I,null,O,q,w,null),w.onAfterShadow(i,w,b,I,O,q,null)}}const N=w.children;for(let O=0,V=N.length;O<V;O++)A(N[O],b,I,j,g)}function U(w){w.target.removeEventListener("dispose",U);for(const I in l){const j=l[I],g=w.target.uuid;g in j&&(j[g].dispose(),delete j[g])}}}const fm={[Gr]:Vr,[Wr]:Yr,[Xr]:Kr,[Ci]:qr,[Vr]:Gr,[Yr]:Wr,[Kr]:Xr,[qr]:Ci};function dm(i){function t(){let P=!1;const ht=new Jt;let W=null;const J=new Jt(0,0,0,0);return{setMask:function(ot){W!==ot&&!P&&(i.colorMask(ot,ot,ot,ot),W=ot)},setLocked:function(ot){P=ot},setClear:function(ot,ut,Gt,ce,Ce){Ce===!0&&(ot*=ce,ut*=ce,Gt*=ce),ht.set(ot,ut,Gt,ce),J.equals(ht)===!1&&(i.clearColor(ot,ut,Gt,ce),J.copy(ht))},reset:function(){P=!1,W=null,J.set(-1,0,0,0)}}}function e(){let P=!1,ht=!1,W=null,J=null,ot=null;return{setReversed:function(ut){ht=ut},setTest:function(ut){ut?nt(i.DEPTH_TEST):st(i.DEPTH_TEST)},setMask:function(ut){W!==ut&&!P&&(i.depthMask(ut),W=ut)},setFunc:function(ut){if(ht&&(ut=fm[ut]),J!==ut){switch(ut){case Gr:i.depthFunc(i.NEVER);break;case Vr:i.depthFunc(i.ALWAYS);break;case Wr:i.depthFunc(i.LESS);break;case Ci:i.depthFunc(i.LEQUAL);break;case Xr:i.depthFunc(i.EQUAL);break;case qr:i.depthFunc(i.GEQUAL);break;case Yr:i.depthFunc(i.GREATER);break;case Kr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=ut}},setLocked:function(ut){P=ut},setClear:function(ut){ot!==ut&&(i.clearDepth(ut),ot=ut)},reset:function(){P=!1,W=null,J=null,ot=null}}}function n(){let P=!1,ht=null,W=null,J=null,ot=null,ut=null,Gt=null,ce=null,Ce=null;return{setTest:function(Xt){P||(Xt?nt(i.STENCIL_TEST):st(i.STENCIL_TEST))},setMask:function(Xt){ht!==Xt&&!P&&(i.stencilMask(Xt),ht=Xt)},setFunc:function(Xt,Pe,on){(W!==Xt||J!==Pe||ot!==on)&&(i.stencilFunc(Xt,Pe,on),W=Xt,J=Pe,ot=on)},setOp:function(Xt,Pe,on){(ut!==Xt||Gt!==Pe||ce!==on)&&(i.stencilOp(Xt,Pe,on),ut=Xt,Gt=Pe,ce=on)},setLocked:function(Xt){P=Xt},setClear:function(Xt){Ce!==Xt&&(i.clearStencil(Xt),Ce=Xt)},reset:function(){P=!1,ht=null,W=null,J=null,ot=null,ut=null,Gt=null,ce=null,Ce=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,c=new WeakMap;let l={},h={},f=new WeakMap,p=[],m=null,_=!1,M=null,d=null,u=null,E=null,y=null,A=null,U=null,w=new Bt(0,0,0),b=0,I=!1,j=null,g=null,S=null,N=null,O=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,k=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Y)[1]),q=k>=1):Y.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),q=k>=2);let G=null,lt={};const ft=i.getParameter(i.SCISSOR_BOX),vt=i.getParameter(i.VIEWPORT),it=new Jt().fromArray(ft),gt=new Jt().fromArray(vt);function B(P,ht,W,J){const ot=new Uint8Array(4),ut=i.createTexture();i.bindTexture(P,ut),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<W;Gt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,ot):i.texImage2D(ht+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ot);return ut}const X={};X[i.TEXTURE_2D]=B(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=B(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=B(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=B(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),r.setFunc(Ci),Ot(!1),Vt(so),nt(i.CULL_FACE),C(Pn);function nt(P){l[P]!==!0&&(i.enable(P),l[P]=!0)}function st(P){l[P]!==!1&&(i.disable(P),l[P]=!1)}function Mt(P,ht){return h[P]!==ht?(i.bindFramebuffer(P,ht),h[P]=ht,P===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ht),P===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function Tt(P,ht){let W=p,J=!1;if(P){W=f.get(ht),W===void 0&&(W=[],f.set(ht,W));const ot=P.textures;if(W.length!==ot.length||W[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Gt=ot.length;ut<Gt;ut++)W[ut]=i.COLOR_ATTACHMENT0+ut;W.length=ot.length,J=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,J=!0);J&&i.drawBuffers(W)}function zt(P){return m!==P?(i.useProgram(P),m=P,!0):!1}const qt={[$n]:i.FUNC_ADD,[Cl]:i.FUNC_SUBTRACT,[Pl]:i.FUNC_REVERSE_SUBTRACT};qt[Ll]=i.MIN,qt[Dl]=i.MAX;const Ht={[Il]:i.ZERO,[Ul]:i.ONE,[Nl]:i.SRC_COLOR,[Hr]:i.SRC_ALPHA,[kl]:i.SRC_ALPHA_SATURATE,[Bl]:i.DST_COLOR,[Ol]:i.DST_ALPHA,[Fl]:i.ONE_MINUS_SRC_COLOR,[kr]:i.ONE_MINUS_SRC_ALPHA,[Hl]:i.ONE_MINUS_DST_COLOR,[zl]:i.ONE_MINUS_DST_ALPHA,[Gl]:i.CONSTANT_COLOR,[Vl]:i.ONE_MINUS_CONSTANT_COLOR,[Wl]:i.CONSTANT_ALPHA,[Xl]:i.ONE_MINUS_CONSTANT_ALPHA};function C(P,ht,W,J,ot,ut,Gt,ce,Ce,Xt){if(P===Pn){_===!0&&(st(i.BLEND),_=!1);return}if(_===!1&&(nt(i.BLEND),_=!0),P!==Rl){if(P!==M||Xt!==I){if((d!==$n||y!==$n)&&(i.blendEquation(i.FUNC_ADD),d=$n,y=$n),Xt)switch(P){case bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ro:i.blendFunc(i.ONE,i.ONE);break;case ao:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ro:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ao:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}u=null,E=null,A=null,U=null,w.set(0,0,0),b=0,M=P,I=Xt}return}ot=ot||ht,ut=ut||W,Gt=Gt||J,(ht!==d||ot!==y)&&(i.blendEquationSeparate(qt[ht],qt[ot]),d=ht,y=ot),(W!==u||J!==E||ut!==A||Gt!==U)&&(i.blendFuncSeparate(Ht[W],Ht[J],Ht[ut],Ht[Gt]),u=W,E=J,A=ut,U=Gt),(ce.equals(w)===!1||Ce!==b)&&(i.blendColor(ce.r,ce.g,ce.b,Ce),w.copy(ce),b=Ce),M=P,I=!1}function Me(P,ht){P.side===Ze?st(i.CULL_FACE):nt(i.CULL_FACE);let W=P.side===Ie;ht&&(W=!W),Ot(W),P.blending===bi&&P.transparent===!1?C(Pn):C(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),r.setFunc(P.depthFunc),r.setTest(P.depthTest),r.setMask(P.depthWrite),s.setMask(P.colorWrite);const J=P.stencilWrite;a.setTest(J),J&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ee(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):st(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(P){j!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),j=P)}function Vt(P){P!==bl?(nt(i.CULL_FACE),P!==g&&(P===so?i.cullFace(i.BACK):P===wl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):st(i.CULL_FACE),g=P}function wt(P){P!==S&&(q&&i.lineWidth(P),S=P)}function ee(P,ht,W){P?(nt(i.POLYGON_OFFSET_FILL),(N!==ht||O!==W)&&(i.polygonOffset(ht,W),N=ht,O=W)):st(i.POLYGON_OFFSET_FILL)}function Pt(P){P?nt(i.SCISSOR_TEST):st(i.SCISSOR_TEST)}function T(P){P===void 0&&(P=i.TEXTURE0+V-1),G!==P&&(i.activeTexture(P),G=P)}function v(P,ht,W){W===void 0&&(G===null?W=i.TEXTURE0+V-1:W=G);let J=lt[W];J===void 0&&(J={type:void 0,texture:void 0},lt[W]=J),(J.type!==P||J.texture!==ht)&&(G!==W&&(i.activeTexture(W),G=W),i.bindTexture(P,ht||X[P]),J.type=P,J.texture=ht)}function F(){const P=lt[G];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function St(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function dt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pt(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ct(P){it.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),it.copy(P))}function mt(P){gt.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),gt.copy(P))}function kt(P,ht){let W=c.get(ht);W===void 0&&(W=new WeakMap,c.set(ht,W));let J=W.get(P);J===void 0&&(J=i.getUniformBlockIndex(ht,P.name),W.set(P,J))}function Lt(P,ht){const J=c.get(ht).get(P);o.get(ht)!==J&&(i.uniformBlockBinding(ht,J,P.__bindingPointIndex),o.set(ht,J))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},G=null,lt={},h={},f=new WeakMap,p=[],m=null,_=!1,M=null,d=null,u=null,E=null,y=null,A=null,U=null,w=new Bt(0,0,0),b=0,I=!1,j=null,g=null,S=null,N=null,O=null,it.set(0,0,i.canvas.width,i.canvas.height),gt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:nt,disable:st,bindFramebuffer:Mt,drawBuffers:Tt,useProgram:zt,setBlending:C,setMaterial:Me,setFlipSided:Ot,setCullFace:Vt,setLineWidth:wt,setPolygonOffset:ee,setScissorTest:Pt,activeTexture:T,bindTexture:v,unbindTexture:F,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:pt,texImage3D:Rt,updateUBOMapping:kt,uniformBlockBinding:Lt,texStorage2D:Wt,texStorage3D:tt,texSubImage2D:$,texSubImage3D:St,compressedTexSubImage2D:at,compressedTexSubImage3D:dt,scissor:Ct,viewport:mt,reset:te}}function jo(i,t,e,n){const s=pm(n);switch(e){case Lc:return i*t;case Ic:return i*t;case Uc:return i*t*2;case Nc:return i*t/s.components*s.byteLength;case Ua:return i*t/s.components*s.byteLength;case Fc:return i*t*2/s.components*s.byteLength;case Na:return i*t*2/s.components*s.byteLength;case Dc:return i*t*3/s.components*s.byteLength;case Je:return i*t*4/s.components*s.byteLength;case Fa:return i*t*4/s.components*s.byteLength;case Cs:case Ps:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ls:case Ds:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qr:case ea:return Math.max(i,16)*Math.max(t,8)/4;case Jr:case ta:return Math.max(i,8)*Math.max(t,8)/2;case na:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case la:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ha:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case fa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case da:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _a:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case va:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Is:case xa:case Ma:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Oc:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ya:case Ea:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pm(i){switch(i){case _n:case Rc:return{byteLength:1,components:1};case Qi:case Cc:case ts:return{byteLength:2,components:1};case Da:case Ia:return{byteLength:2,components:4};case Qn:case La:case pn:return{byteLength:4,components:1};case Pc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function mm(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Dt,h=new WeakMap;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return m?new OffscreenCanvas(T,v):Vs("canvas")}function M(T,v,F){let Z=1;const Q=Pt(T);if((Q.width>F||Q.height>F)&&(Z=F/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(Z*Q.width),St=Math.floor(Z*Q.height);f===void 0&&(f=_($,St));const at=v?_($,St):f;return at.width=$,at.height=St,at.getContext("2d").drawImage(T,0,0,$,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+St+")."),at}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function d(T){return T.generateMipmaps&&T.minFilter!==Ve&&T.minFilter!==je}function u(T){i.generateMipmap(T)}function E(T,v,F,Z,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=v;if(v===i.RED&&(F===i.FLOAT&&($=i.R32F),F===i.HALF_FLOAT&&($=i.R16F),F===i.UNSIGNED_BYTE&&($=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.R8UI),F===i.UNSIGNED_SHORT&&($=i.R16UI),F===i.UNSIGNED_INT&&($=i.R32UI),F===i.BYTE&&($=i.R8I),F===i.SHORT&&($=i.R16I),F===i.INT&&($=i.R32I)),v===i.RG&&(F===i.FLOAT&&($=i.RG32F),F===i.HALF_FLOAT&&($=i.RG16F),F===i.UNSIGNED_BYTE&&($=i.RG8)),v===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RG8UI),F===i.UNSIGNED_SHORT&&($=i.RG16UI),F===i.UNSIGNED_INT&&($=i.RG32UI),F===i.BYTE&&($=i.RG8I),F===i.SHORT&&($=i.RG16I),F===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGB8UI),F===i.UNSIGNED_SHORT&&($=i.RGB16UI),F===i.UNSIGNED_INT&&($=i.RGB32UI),F===i.BYTE&&($=i.RGB8I),F===i.SHORT&&($=i.RGB16I),F===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&($=i.RGBA8UI),F===i.UNSIGNED_SHORT&&($=i.RGBA16UI),F===i.UNSIGNED_INT&&($=i.RGBA32UI),F===i.BYTE&&($=i.RGBA8I),F===i.SHORT&&($=i.RGBA16I),F===i.INT&&($=i.RGBA32I)),v===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),v===i.RGBA){const St=Q?Bs:$t.getTransfer(Z);F===i.FLOAT&&($=i.RGBA32F),F===i.HALF_FLOAT&&($=i.RGBA16F),F===i.UNSIGNED_BYTE&&($=St===ie?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function y(T,v){let F;return T?v===null||v===Qn||v===Di?F=i.DEPTH24_STENCIL8:v===pn?F=i.DEPTH32F_STENCIL8:v===Qi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Qn||v===Di?F=i.DEPTH_COMPONENT24:v===pn?F=i.DEPTH_COMPONENT32F:v===Qi&&(F=i.DEPTH_COMPONENT16),F}function A(T,v){return d(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ve&&T.minFilter!==je?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function U(T){const v=T.target;v.removeEventListener("dispose",U),b(v),v.isVideoTexture&&h.delete(v)}function w(T){const v=T.target;v.removeEventListener("dispose",w),j(v)}function b(T){const v=n.get(T);if(v.__webglInit===void 0)return;const F=T.source,Z=p.get(F);if(Z){const Q=Z[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&I(T),Object.keys(Z).length===0&&p.delete(F)}n.remove(T)}function I(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const F=T.source,Z=p.get(F);delete Z[v.__cacheKey],a.memory.textures--}function j(T){const v=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let Q=0;Q<v.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=T.textures;for(let Z=0,Q=F.length;Z<Q;Z++){const $=n.get(F[Z]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(F[Z])}n.remove(T)}let g=0;function S(){g=0}function N(){const T=g;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),g+=1,T}function O(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function V(T,v){const F=n.get(T);if(T.isVideoTexture&&wt(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{gt(F,T,v);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function q(T,v){const F=n.get(T);if(T.version>0&&F.__version!==T.version){gt(F,T,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function k(T,v){const F=n.get(T);if(T.version>0&&F.__version!==T.version){gt(F,T,v);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function Y(T,v){const F=n.get(T);if(T.version>0&&F.__version!==T.version){B(F,T,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}const G={[zs]:i.REPEAT,[jn]:i.CLAMP_TO_EDGE,[jr]:i.MIRRORED_REPEAT},lt={[Ve]:i.NEAREST,[th]:i.NEAREST_MIPMAP_NEAREST,[ss]:i.NEAREST_MIPMAP_LINEAR,[je]:i.LINEAR,[tr]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},ft={[sh]:i.NEVER,[hh]:i.ALWAYS,[rh]:i.LESS,[Bc]:i.LEQUAL,[ah]:i.EQUAL,[lh]:i.GEQUAL,[oh]:i.GREATER,[ch]:i.NOTEQUAL};function vt(T,v){if(v.type===pn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===je||v.magFilter===tr||v.magFilter===ss||v.magFilter===Jn||v.minFilter===je||v.minFilter===tr||v.minFilter===ss||v.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,G[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,G[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,G[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,lt[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,lt[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ve||v.minFilter!==ss&&v.minFilter!==Jn||v.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function it(T,v){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",U));const Z=v.source;let Q=p.get(Z);Q===void 0&&(Q={},p.set(Z,Q));const $=O(v);if($!==T.__cacheKey){Q[$]===void 0&&(Q[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[$].usedTimes++;const St=Q[T.__cacheKey];St!==void 0&&(Q[T.__cacheKey].usedTimes--,St.usedTimes===0&&I(v)),T.__cacheKey=$,T.__webglTexture=Q[$].texture}return F}function gt(T,v,F){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);const Q=it(T,v),$=v.source;e.bindTexture(Z,T.__webglTexture,i.TEXTURE0+F);const St=n.get($);if($.version!==St.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);const at=$t.getPrimaries($t.workingColorSpace),dt=v.colorSpace===wn?null:$t.getPrimaries(v.colorSpace),Wt=v.colorSpace===wn||at===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let tt=M(v.image,!1,s.maxTextureSize);tt=ee(v,tt);const pt=r.convert(v.format,v.colorSpace),Rt=r.convert(v.type);let Ct=E(v.internalFormat,pt,Rt,v.colorSpace,v.isVideoTexture);vt(Z,v);let mt;const kt=v.mipmaps,Lt=v.isVideoTexture!==!0,te=St.__version===void 0||Q===!0,P=$.dataReady,ht=A(v,tt);if(v.isDepthTexture)Ct=y(v.format===Ii,v.type),te&&(Lt?e.texStorage2D(i.TEXTURE_2D,1,Ct,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Ct,tt.width,tt.height,0,pt,Rt,null));else if(v.isDataTexture)if(kt.length>0){Lt&&te&&e.texStorage2D(i.TEXTURE_2D,ht,Ct,kt[0].width,kt[0].height);for(let W=0,J=kt.length;W<J;W++)mt=kt[W],Lt?P&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,mt.width,mt.height,pt,Rt,mt.data):e.texImage2D(i.TEXTURE_2D,W,Ct,mt.width,mt.height,0,pt,Rt,mt.data);v.generateMipmaps=!1}else Lt?(te&&e.texStorage2D(i.TEXTURE_2D,ht,Ct,tt.width,tt.height),P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,pt,Rt,tt.data)):e.texImage2D(i.TEXTURE_2D,0,Ct,tt.width,tt.height,0,pt,Rt,tt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Lt&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,Ct,kt[0].width,kt[0].height,tt.depth);for(let W=0,J=kt.length;W<J;W++)if(mt=kt[W],v.format!==Je)if(pt!==null)if(Lt){if(P)if(v.layerUpdates.size>0){const ot=jo(mt.width,mt.height,v.format,v.type);for(const ut of v.layerUpdates){const Gt=mt.data.subarray(ut*ot/mt.data.BYTES_PER_ELEMENT,(ut+1)*ot/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,ut,mt.width,mt.height,1,pt,Gt,0,0)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,mt.width,mt.height,tt.depth,pt,mt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,Ct,mt.width,mt.height,tt.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?P&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,mt.width,mt.height,tt.depth,pt,Rt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,W,Ct,mt.width,mt.height,tt.depth,0,pt,Rt,mt.data)}else{Lt&&te&&e.texStorage2D(i.TEXTURE_2D,ht,Ct,kt[0].width,kt[0].height);for(let W=0,J=kt.length;W<J;W++)mt=kt[W],v.format!==Je?pt!==null?Lt?P&&e.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,W,Ct,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?P&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,mt.width,mt.height,pt,Rt,mt.data):e.texImage2D(i.TEXTURE_2D,W,Ct,mt.width,mt.height,0,pt,Rt,mt.data)}else if(v.isDataArrayTexture)if(Lt){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,Ct,tt.width,tt.height,tt.depth),P)if(v.layerUpdates.size>0){const W=jo(tt.width,tt.height,v.format,v.type);for(const J of v.layerUpdates){const ot=tt.data.subarray(J*W/tt.data.BYTES_PER_ELEMENT,(J+1)*W/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,tt.width,tt.height,1,pt,Rt,ot)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,pt,Rt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,tt.width,tt.height,tt.depth,0,pt,Rt,tt.data);else if(v.isData3DTexture)Lt?(te&&e.texStorage3D(i.TEXTURE_3D,ht,Ct,tt.width,tt.height,tt.depth),P&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,pt,Rt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,tt.width,tt.height,tt.depth,0,pt,Rt,tt.data);else if(v.isFramebufferTexture){if(te)if(Lt)e.texStorage2D(i.TEXTURE_2D,ht,Ct,tt.width,tt.height);else{let W=tt.width,J=tt.height;for(let ot=0;ot<ht;ot++)e.texImage2D(i.TEXTURE_2D,ot,Ct,W,J,0,pt,Rt,null),W>>=1,J>>=1}}else if(kt.length>0){if(Lt&&te){const W=Pt(kt[0]);e.texStorage2D(i.TEXTURE_2D,ht,Ct,W.width,W.height)}for(let W=0,J=kt.length;W<J;W++)mt=kt[W],Lt?P&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,pt,Rt,mt):e.texImage2D(i.TEXTURE_2D,W,Ct,pt,Rt,mt);v.generateMipmaps=!1}else if(Lt){if(te){const W=Pt(tt);e.texStorage2D(i.TEXTURE_2D,ht,Ct,W.width,W.height)}P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,Rt,tt)}else e.texImage2D(i.TEXTURE_2D,0,Ct,pt,Rt,tt);d(v)&&u(Z),St.__version=$.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function B(T,v,F){if(v.image.length!==6)return;const Z=it(T,v),Q=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const $=n.get(Q);if(Q.version!==$.__version||Z===!0){e.activeTexture(i.TEXTURE0+F);const St=$t.getPrimaries($t.workingColorSpace),at=v.colorSpace===wn?null:$t.getPrimaries(v.colorSpace),dt=v.colorSpace===wn||St===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Wt=v.isCompressedTexture||v.image[0].isCompressedTexture,tt=v.image[0]&&v.image[0].isDataTexture,pt=[];for(let J=0;J<6;J++)!Wt&&!tt?pt[J]=M(v.image[J],!0,s.maxCubemapSize):pt[J]=tt?v.image[J].image:v.image[J],pt[J]=ee(v,pt[J]);const Rt=pt[0],Ct=r.convert(v.format,v.colorSpace),mt=r.convert(v.type),kt=E(v.internalFormat,Ct,mt,v.colorSpace),Lt=v.isVideoTexture!==!0,te=$.__version===void 0||Z===!0,P=Q.dataReady;let ht=A(v,Rt);vt(i.TEXTURE_CUBE_MAP,v);let W;if(Wt){Lt&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,kt,Rt.width,Rt.height);for(let J=0;J<6;J++){W=pt[J].mipmaps;for(let ot=0;ot<W.length;ot++){const ut=W[ot];v.format!==Je?Ct!==null?Lt?P&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,0,0,ut.width,ut.height,Ct,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,kt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,0,0,ut.width,ut.height,Ct,mt,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot,kt,ut.width,ut.height,0,Ct,mt,ut.data)}}}else{if(W=v.mipmaps,Lt&&te){W.length>0&&ht++;const J=Pt(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,kt,J.width,J.height)}for(let J=0;J<6;J++)if(tt){Lt?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pt[J].width,pt[J].height,Ct,mt,pt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,kt,pt[J].width,pt[J].height,0,Ct,mt,pt[J].data);for(let ot=0;ot<W.length;ot++){const Gt=W[ot].image[J].image;Lt?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,0,0,Gt.width,Gt.height,Ct,mt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,kt,Gt.width,Gt.height,0,Ct,mt,Gt.data)}}else{Lt?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ct,mt,pt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,kt,Ct,mt,pt[J]);for(let ot=0;ot<W.length;ot++){const ut=W[ot];Lt?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,0,0,Ct,mt,ut.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ot+1,kt,Ct,mt,ut.image[J])}}}d(v)&&u(i.TEXTURE_CUBE_MAP),$.__version=Q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function X(T,v,F,Z,Q,$){const St=r.convert(F.format,F.colorSpace),at=r.convert(F.type),dt=E(F.internalFormat,St,at,F.colorSpace);if(!n.get(v).__hasExternalTextures){const tt=Math.max(1,v.width>>$),pt=Math.max(1,v.height>>$);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,dt,tt,pt,v.depth,0,St,at,null):e.texImage2D(Q,$,dt,tt,pt,0,St,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Vt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Q,n.get(F).__webglTexture,0,Ot(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,Q,n.get(F).__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(T,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){const Z=v.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,$=y(v.stencilBuffer,Q),St=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=Ot(v);Vt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,$,v.width,v.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,T)}else{const Z=v.textures;for(let Q=0;Q<Z.length;Q++){const $=Z[Q],St=r.convert($.format,$.colorSpace),at=r.convert($.type),dt=E($.internalFormat,St,at,$.colorSpace),Wt=Ot(v);F&&Vt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,dt,v.width,v.height):Vt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt,dt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,dt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function st(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V(v.depthTexture,0);const Z=n.get(v.depthTexture).__webglTexture,Q=Ot(v);if(v.depthTexture.format===wi)Vt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(v.depthTexture.format===Ii)Vt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Mt(T){const v=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=Z}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");st(v.__webglFramebuffer,T)}else if(F){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),nt(v.__webglDepthbuffer[Z],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),nt(v.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(T,v,F){const Z=n.get(T);v!==void 0&&X(Z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Mt(T)}function zt(T){const v=T.texture,F=n.get(T),Z=n.get(v);T.addEventListener("dispose",w);const Q=T.textures,$=T.isWebGLCubeRenderTarget===!0,St=Q.length>1;if(St||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let at=0;at<6;at++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[at]=[];for(let dt=0;dt<v.mipmaps.length;dt++)F.__webglFramebuffer[at][dt]=i.createFramebuffer()}else F.__webglFramebuffer[at]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let at=0;at<v.mipmaps.length;at++)F.__webglFramebuffer[at]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(St)for(let at=0,dt=Q.length;at<dt;at++){const Wt=n.get(Q[at]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Vt(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let at=0;at<Q.length;at++){const dt=Q[at];F.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[at]);const Wt=r.convert(dt.format,dt.colorSpace),tt=r.convert(dt.type),pt=E(dt.internalFormat,Wt,tt,dt.colorSpace,T.isXRRenderTarget===!0),Rt=Ot(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,pt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,F.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),nt(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),vt(i.TEXTURE_CUBE_MAP,v);for(let at=0;at<6;at++)if(v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)X(F.__webglFramebuffer[at][dt],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,dt);else X(F.__webglFramebuffer[at],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);d(v)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let at=0,dt=Q.length;at<dt;at++){const Wt=Q[at],tt=n.get(Wt);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),vt(i.TEXTURE_2D,Wt),X(F.__webglFramebuffer,T,Wt,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),d(Wt)&&u(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(at=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,Z.__webglTexture),vt(at,v),v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)X(F.__webglFramebuffer[dt],T,v,i.COLOR_ATTACHMENT0,at,dt);else X(F.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,at,0);d(v)&&u(at),e.unbindTexture()}T.depthBuffer&&Mt(T)}function qt(T){const v=T.textures;for(let F=0,Z=v.length;F<Z;F++){const Q=v[F];if(d(Q)){const $=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,St=n.get(Q).__webglTexture;e.bindTexture($,St),u($),e.unbindTexture()}}}const Ht=[],C=[];function Me(T){if(T.samples>0){if(Vt(T)===!1){const v=T.textures,F=T.width,Z=T.height;let Q=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(T),at=v.length>1;if(at)for(let dt=0;dt<v.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let dt=0;dt<v.length;dt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[dt]);const Wt=n.get(v[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Wt,0)}i.blitFramebuffer(0,0,F,Z,0,0,F,Z,Q,i.NEAREST),c===!0&&(Ht.length=0,C.length=0,Ht.push(i.COLOR_ATTACHMENT0+dt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ht.push($),C.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ht))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let dt=0;dt<v.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,St.__webglColorRenderbuffer[dt]);const Wt=n.get(v[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ot(T){return Math.min(s.maxSamples,T.samples)}function Vt(T){const v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function wt(T){const v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function ee(T,v){const F=T.colorSpace,Z=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==On&&F!==wn&&($t.getTransfer(F)===ie?(Z!==Je||Q!==_n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function Pt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=S,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=k,this.setTextureCube=Y,this.rebindTextures=Tt,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=X,this.useMultisampledRTT=Vt}function gm(i,t){function e(n,s=wn){let r;const a=$t.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===Da)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Pc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Rc)return i.BYTE;if(n===Cc)return i.SHORT;if(n===Qi)return i.UNSIGNED_SHORT;if(n===La)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===ts)return i.HALF_FLOAT;if(n===Lc)return i.ALPHA;if(n===Dc)return i.RGB;if(n===Je)return i.RGBA;if(n===Ic)return i.LUMINANCE;if(n===Uc)return i.LUMINANCE_ALPHA;if(n===wi)return i.DEPTH_COMPONENT;if(n===Ii)return i.DEPTH_STENCIL;if(n===Nc)return i.RED;if(n===Ua)return i.RED_INTEGER;if(n===Fc)return i.RG;if(n===Na)return i.RG_INTEGER;if(n===Fa)return i.RGBA_INTEGER;if(n===Cs||n===Ps||n===Ls||n===Ds)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Cs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Cs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ds)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jr||n===Qr||n===ta||n===ea)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===na||n===ia||n===sa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===na||n===ia)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ra||n===aa||n===oa||n===ca||n===la||n===ha||n===ua||n===fa||n===da||n===pa||n===ma||n===ga||n===_a||n===va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ra)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===aa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ca)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===la)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ha)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ua)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===da)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ma)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ga)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_a)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===va)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Is||n===xa||n===Ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Is)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oc||n===Sa||n===ya||n===Ea)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Is)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Sa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ea)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Di?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class _m extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ti extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vm={type:"move"};class Pr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ti,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ti,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ti,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const M of t.hand.values()){const d=e.getJointPose(M,n),u=this._getHandJoint(l,M);d!==null&&(u.matrix.fromArray(d.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=d.radius),u.visible=d!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],p=h.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&p>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vm)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ti;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const xm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Mm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Sm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Re,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Nn({vertexShader:xm,fragmentShader:Mm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ft(new Rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ym extends Fi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,p=null,m=null,_=null;const M=new Sm,d=e.getContextAttributes();let u=null,E=null;const y=[],A=[],U=new Dt;let w=null;const b=new ze;b.layers.enable(1),b.viewport=new Jt;const I=new ze;I.layers.enable(2),I.viewport=new Jt;const j=[b,I],g=new _m;g.layers.enable(1),g.layers.enable(2);let S=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let X=y[B];return X===void 0&&(X=new Pr,y[B]=X),X.getTargetRaySpace()},this.getControllerGrip=function(B){let X=y[B];return X===void 0&&(X=new Pr,y[B]=X),X.getGripSpace()},this.getHand=function(B){let X=y[B];return X===void 0&&(X=new Pr,y[B]=X),X.getHandSpace()};function O(B){const X=A.indexOf(B.inputSource);if(X===-1)return;const nt=y[X];nt!==void 0&&(nt.update(B.inputSource,B.frame,l||a),nt.dispatchEvent({type:B.type,data:B.inputSource}))}function V(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",q);for(let B=0;B<y.length;B++){const X=A[B];X!==null&&(A[B]=null,y[B].disconnect(X))}S=null,N=null,M.reset(),t.setRenderTarget(u),m=null,p=null,f=null,s=null,E=null,gt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(B){l=B},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(u=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",V),s.addEventListener("inputsourceschange",q),d.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(U),s.renderState.layers===void 0){const X={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,X),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new ti(m.framebufferWidth,m.framebufferHeight,{format:Je,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:d.stencil})}else{let X=null,nt=null,st=null;d.depth&&(st=d.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,X=d.stencil?Ii:wi,nt=d.stencil?Di:Qn);const Mt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};f=new XRWebGLBinding(s,e),p=f.createProjectionLayer(Mt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),E=new ti(p.textureWidth,p.textureHeight,{format:Je,type:_n,depthTexture:new Jc(p.textureWidth,p.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:d.stencil,colorSpace:t.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),gt.setContext(s),gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function q(B){for(let X=0;X<B.removed.length;X++){const nt=B.removed[X],st=A.indexOf(nt);st>=0&&(A[st]=null,y[st].disconnect(nt))}for(let X=0;X<B.added.length;X++){const nt=B.added[X];let st=A.indexOf(nt);if(st===-1){for(let Tt=0;Tt<y.length;Tt++)if(Tt>=A.length){A.push(nt),st=Tt;break}else if(A[Tt]===null){A[Tt]=nt,st=Tt;break}if(st===-1)break}const Mt=y[st];Mt&&Mt.connect(nt)}}const k=new R,Y=new R;function G(B,X,nt){k.setFromMatrixPosition(X.matrixWorld),Y.setFromMatrixPosition(nt.matrixWorld);const st=k.distanceTo(Y),Mt=X.projectionMatrix.elements,Tt=nt.projectionMatrix.elements,zt=Mt[14]/(Mt[10]-1),qt=Mt[14]/(Mt[10]+1),Ht=(Mt[9]+1)/Mt[5],C=(Mt[9]-1)/Mt[5],Me=(Mt[8]-1)/Mt[0],Ot=(Tt[8]+1)/Tt[0],Vt=zt*Me,wt=zt*Ot,ee=st/(-Me+Ot),Pt=ee*-Me;if(X.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(Pt),B.translateZ(ee),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),Mt[10]===-1)B.projectionMatrix.copy(X.projectionMatrix),B.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const T=zt+ee,v=qt+ee,F=Vt-Pt,Z=wt+(st-Pt),Q=Ht*qt/v*T,$=C*qt/v*T;B.projectionMatrix.makePerspective(F,Z,Q,$,T,v),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function lt(B,X){X===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(X.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let X=B.near,nt=B.far;M.texture!==null&&(M.depthNear>0&&(X=M.depthNear),M.depthFar>0&&(nt=M.depthFar)),g.near=I.near=b.near=X,g.far=I.far=b.far=nt,(S!==g.near||N!==g.far)&&(s.updateRenderState({depthNear:g.near,depthFar:g.far}),S=g.near,N=g.far);const st=B.parent,Mt=g.cameras;lt(g,st);for(let Tt=0;Tt<Mt.length;Tt++)lt(Mt[Tt],st);Mt.length===2?G(g,b,I):g.projectionMatrix.copy(b.projectionMatrix),ft(B,g,st)};function ft(B,X,nt){nt===null?B.matrix.copy(X.matrixWorld):(B.matrix.copy(nt.matrixWorld),B.matrix.invert(),B.matrix.multiply(X.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(X.projectionMatrix),B.projectionMatrixInverse.copy(X.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Aa*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(B){c=B,p!==null&&(p.fixedFoveation=B),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=B)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(g)};let vt=null;function it(B,X){if(h=X.getViewerPose(l||a),_=X,h!==null){const nt=h.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let st=!1;nt.length!==g.cameras.length&&(g.cameras.length=0,st=!0);for(let Tt=0;Tt<nt.length;Tt++){const zt=nt[Tt];let qt=null;if(m!==null)qt=m.getViewport(zt);else{const C=f.getViewSubImage(p,zt);qt=C.viewport,Tt===0&&(t.setRenderTargetTextures(E,C.colorTexture,p.ignoreDepthValues?void 0:C.depthStencilTexture),t.setRenderTarget(E))}let Ht=j[Tt];Ht===void 0&&(Ht=new ze,Ht.layers.enable(Tt),Ht.viewport=new Jt,j[Tt]=Ht),Ht.matrix.fromArray(zt.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(zt.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(qt.x,qt.y,qt.width,qt.height),Tt===0&&(g.matrix.copy(Ht.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),st===!0&&g.cameras.push(Ht)}const Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")){const Tt=f.getDepthInformation(nt[0]);Tt&&Tt.isValid&&Tt.texture&&M.init(t,Tt,s.renderState)}}for(let nt=0;nt<y.length;nt++){const st=A[nt],Mt=y[nt];st!==null&&Mt!==void 0&&Mt.update(st,X,l||a)}vt&&vt(B,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),_=null}const gt=new Zc;gt.setAnimationLoop(it),this.setAnimationLoop=function(B){vt=B},this.dispose=function(){}}}const qn=new an,Em=new se;function Tm(i,t){function e(d,u){d.matrixAutoUpdate===!0&&d.updateMatrix(),u.value.copy(d.matrix)}function n(d,u){u.color.getRGB(d.fogColor.value,Yc(i)),u.isFog?(d.fogNear.value=u.near,d.fogFar.value=u.far):u.isFogExp2&&(d.fogDensity.value=u.density)}function s(d,u,E,y,A){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(d,u):u.isMeshToonMaterial?(r(d,u),f(d,u)):u.isMeshPhongMaterial?(r(d,u),h(d,u)):u.isMeshStandardMaterial?(r(d,u),p(d,u),u.isMeshPhysicalMaterial&&m(d,u,A)):u.isMeshMatcapMaterial?(r(d,u),_(d,u)):u.isMeshDepthMaterial?r(d,u):u.isMeshDistanceMaterial?(r(d,u),M(d,u)):u.isMeshNormalMaterial?r(d,u):u.isLineBasicMaterial?(a(d,u),u.isLineDashedMaterial&&o(d,u)):u.isPointsMaterial?c(d,u,E,y):u.isSpriteMaterial?l(d,u):u.isShadowMaterial?(d.color.value.copy(u.color),d.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(d,u){d.opacity.value=u.opacity,u.color&&d.diffuse.value.copy(u.color),u.emissive&&d.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(d.map.value=u.map,e(u.map,d.mapTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.bumpMap&&(d.bumpMap.value=u.bumpMap,e(u.bumpMap,d.bumpMapTransform),d.bumpScale.value=u.bumpScale,u.side===Ie&&(d.bumpScale.value*=-1)),u.normalMap&&(d.normalMap.value=u.normalMap,e(u.normalMap,d.normalMapTransform),d.normalScale.value.copy(u.normalScale),u.side===Ie&&d.normalScale.value.negate()),u.displacementMap&&(d.displacementMap.value=u.displacementMap,e(u.displacementMap,d.displacementMapTransform),d.displacementScale.value=u.displacementScale,d.displacementBias.value=u.displacementBias),u.emissiveMap&&(d.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,d.emissiveMapTransform)),u.specularMap&&(d.specularMap.value=u.specularMap,e(u.specularMap,d.specularMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest);const E=t.get(u),y=E.envMap,A=E.envMapRotation;y&&(d.envMap.value=y,qn.copy(A),qn.x*=-1,qn.y*=-1,qn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),d.envMapRotation.value.setFromMatrix4(Em.makeRotationFromEuler(qn)),d.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=u.reflectivity,d.ior.value=u.ior,d.refractionRatio.value=u.refractionRatio),u.lightMap&&(d.lightMap.value=u.lightMap,d.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,d.lightMapTransform)),u.aoMap&&(d.aoMap.value=u.aoMap,d.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,d.aoMapTransform))}function a(d,u){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,u.map&&(d.map.value=u.map,e(u.map,d.mapTransform))}function o(d,u){d.dashSize.value=u.dashSize,d.totalSize.value=u.dashSize+u.gapSize,d.scale.value=u.scale}function c(d,u,E,y){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,d.size.value=u.size*E,d.scale.value=y*.5,u.map&&(d.map.value=u.map,e(u.map,d.uvTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest)}function l(d,u){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,d.rotation.value=u.rotation,u.map&&(d.map.value=u.map,e(u.map,d.mapTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest)}function h(d,u){d.specular.value.copy(u.specular),d.shininess.value=Math.max(u.shininess,1e-4)}function f(d,u){u.gradientMap&&(d.gradientMap.value=u.gradientMap)}function p(d,u){d.metalness.value=u.metalness,u.metalnessMap&&(d.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,d.metalnessMapTransform)),d.roughness.value=u.roughness,u.roughnessMap&&(d.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,d.roughnessMapTransform)),u.envMap&&(d.envMapIntensity.value=u.envMapIntensity)}function m(d,u,E){d.ior.value=u.ior,u.sheen>0&&(d.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),d.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(d.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,d.sheenColorMapTransform)),u.sheenRoughnessMap&&(d.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,d.sheenRoughnessMapTransform))),u.clearcoat>0&&(d.clearcoat.value=u.clearcoat,d.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(d.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,d.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(d.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ie&&d.clearcoatNormalScale.value.negate())),u.dispersion>0&&(d.dispersion.value=u.dispersion),u.iridescence>0&&(d.iridescence.value=u.iridescence,d.iridescenceIOR.value=u.iridescenceIOR,d.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(d.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,d.iridescenceMapTransform)),u.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),u.transmission>0&&(d.transmission.value=u.transmission,d.transmissionSamplerMap.value=E.texture,d.transmissionSamplerSize.value.set(E.width,E.height),u.transmissionMap&&(d.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,d.transmissionMapTransform)),d.thickness.value=u.thickness,u.thicknessMap&&(d.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=u.attenuationDistance,d.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(d.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(d.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=u.specularIntensity,d.specularColor.value.copy(u.specularColor),u.specularColorMap&&(d.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,d.specularColorMapTransform)),u.specularIntensityMap&&(d.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,d.specularIntensityMapTransform))}function _(d,u){u.matcap&&(d.matcap.value=u.matcap)}function M(d,u){const E=t.get(u).light;d.referencePosition.value.setFromMatrixPosition(E.matrixWorld),d.nearDistance.value=E.shadow.camera.near,d.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Am(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,y){const A=y.program;n.uniformBlockBinding(E,A)}function l(E,y){let A=s[E.id];A===void 0&&(_(E),A=h(E),s[E.id]=A,E.addEventListener("dispose",d));const U=y.program;n.updateUBOMapping(E,U);const w=t.render.frame;r[E.id]!==w&&(p(E),r[E.id]=w)}function h(E){const y=f();E.__bindingPointIndex=y;const A=i.createBuffer(),U=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,U,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,A),A}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const y=s[E.id],A=E.uniforms,U=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,b=A.length;w<b;w++){const I=Array.isArray(A[w])?A[w]:[A[w]];for(let j=0,g=I.length;j<g;j++){const S=I[j];if(m(S,w,j,U)===!0){const N=S.__offset,O=Array.isArray(S.value)?S.value:[S.value];let V=0;for(let q=0;q<O.length;q++){const k=O[q],Y=M(k);typeof k=="number"||typeof k=="boolean"?(S.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,N+V,S.__data)):k.isMatrix3?(S.__data[0]=k.elements[0],S.__data[1]=k.elements[1],S.__data[2]=k.elements[2],S.__data[3]=0,S.__data[4]=k.elements[3],S.__data[5]=k.elements[4],S.__data[6]=k.elements[5],S.__data[7]=0,S.__data[8]=k.elements[6],S.__data[9]=k.elements[7],S.__data[10]=k.elements[8],S.__data[11]=0):(k.toArray(S.__data,V),V+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,y,A,U){const w=E.value,b=y+"_"+A;if(U[b]===void 0)return typeof w=="number"||typeof w=="boolean"?U[b]=w:U[b]=w.clone(),!0;{const I=U[b];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return U[b]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function _(E){const y=E.uniforms;let A=0;const U=16;for(let b=0,I=y.length;b<I;b++){const j=Array.isArray(y[b])?y[b]:[y[b]];for(let g=0,S=j.length;g<S;g++){const N=j[g],O=Array.isArray(N.value)?N.value:[N.value];for(let V=0,q=O.length;V<q;V++){const k=O[V],Y=M(k),G=A%U,lt=G%Y.boundary,ft=G+lt;A+=lt,ft!==0&&U-ft<Y.storage&&(A+=U-ft),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=A,A+=Y.storage}}}const w=A%U;return w>0&&(A+=U-w),E.__size=A,E.__cache={},this}function M(E){const y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),y}function d(E){const y=E.target;y.removeEventListener("dispose",d);const A=a.indexOf(y.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function u(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:u}}class bm{constructor(t={}){const{canvas:e=fh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),_=new Int32Array(4);let M=null,d=null;const u=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this.toneMapping=Ln,this.toneMappingExposure=1;const y=this;let A=!1,U=0,w=0,b=null,I=-1,j=null;const g=new Jt,S=new Jt;let N=null;const O=new Bt(0);let V=0,q=e.width,k=e.height,Y=1,G=null,lt=null;const ft=new Jt(0,0,q,k),vt=new Jt(0,0,q,k);let it=!1;const gt=new Ha;let B=!1,X=!1;const nt=new se,st=new se,Mt=new R,Tt=new Jt,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function Ht(){return b===null?Y:1}let C=n;function Me(x,L){return e.getContext(x,L)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Pa}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",ot,!1),e.addEventListener("webglcontextcreationerror",ut,!1),C===null){const L="webgl2";if(C=Me(L,x),C===null)throw Me(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ot,Vt,wt,ee,Pt,T,v,F,Z,Q,$,St,at,dt,Wt,tt,pt,Rt,Ct,mt,kt,Lt,te,P;function ht(){Ot=new Ld(C),Ot.init(),Lt=new gm(C,Ot),Vt=new Ad(C,Ot,t,Lt),wt=new dm(C),Vt.reverseDepthBuffer&&wt.buffers.depth.setReversed(!0),ee=new Ud(C),Pt=new Jp,T=new mm(C,Ot,wt,Pt,Vt,Lt,ee),v=new wd(y),F=new Pd(y),Z=new Hh(C),te=new Ed(C,Z),Q=new Dd(C,Z,ee,te),$=new Fd(C,Q,Z,ee),Ct=new Nd(C,Vt,T),tt=new bd(Pt),St=new jp(y,v,F,Ot,Vt,te,tt),at=new Tm(y,Pt),dt=new tm,Wt=new am(Ot),Rt=new yd(y,v,F,wt,$,p,c),pt=new um(y,$,Vt),P=new Am(C,ee,Vt,wt),mt=new Td(C,Ot,ee),kt=new Id(C,Ot,ee),ee.programs=St.programs,y.capabilities=Vt,y.extensions=Ot,y.properties=Pt,y.renderLists=dt,y.shadowMap=pt,y.state=wt,y.info=ee}ht();const W=new ym(y,C);this.xr=W,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const x=Ot.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ot.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(x){x!==void 0&&(Y=x,this.setSize(q,k,!1))},this.getSize=function(x){return x.set(q,k)},this.setSize=function(x,L,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=x,k=L,e.width=Math.floor(x*Y),e.height=Math.floor(L*Y),z===!0&&(e.style.width=x+"px",e.style.height=L+"px"),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(q*Y,k*Y).floor()},this.setDrawingBufferSize=function(x,L,z){q=x,k=L,Y=z,e.width=Math.floor(x*z),e.height=Math.floor(L*z),this.setViewport(0,0,x,L)},this.getCurrentViewport=function(x){return x.copy(g)},this.getViewport=function(x){return x.copy(ft)},this.setViewport=function(x,L,z,H){x.isVector4?ft.set(x.x,x.y,x.z,x.w):ft.set(x,L,z,H),wt.viewport(g.copy(ft).multiplyScalar(Y).round())},this.getScissor=function(x){return x.copy(vt)},this.setScissor=function(x,L,z,H){x.isVector4?vt.set(x.x,x.y,x.z,x.w):vt.set(x,L,z,H),wt.scissor(S.copy(vt).multiplyScalar(Y).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(x){wt.setScissorTest(it=x)},this.setOpaqueSort=function(x){G=x},this.setTransparentSort=function(x){lt=x},this.getClearColor=function(x){return x.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(x=!0,L=!0,z=!0){let H=0;if(x){let D=!1;if(b!==null){const et=b.texture.format;D=et===Fa||et===Na||et===Ua}if(D){const et=b.texture.type,ct=et===_n||et===Qn||et===Qi||et===Di||et===Da||et===Ia,_t=Rt.getClearColor(),xt=Rt.getClearAlpha(),At=_t.r,bt=_t.g,yt=_t.b;ct?(m[0]=At,m[1]=bt,m[2]=yt,m[3]=xt,C.clearBufferuiv(C.COLOR,0,m)):(_[0]=At,_[1]=bt,_[2]=yt,_[3]=xt,C.clearBufferiv(C.COLOR,0,_))}else H|=C.COLOR_BUFFER_BIT}L&&(H|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),z&&(H|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",ot,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),dt.dispose(),Wt.dispose(),Pt.dispose(),v.dispose(),F.dispose(),$.dispose(),te.dispose(),P.dispose(),St.dispose(),W.dispose(),W.removeEventListener("sessionstart",Za),W.removeEventListener("sessionend",ja),Hn.stop()};function J(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function ot(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const x=ee.autoReset,L=pt.enabled,z=pt.autoUpdate,H=pt.needsUpdate,D=pt.type;ht(),ee.autoReset=x,pt.enabled=L,pt.autoUpdate=z,pt.needsUpdate=H,pt.type=D}function ut(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Gt(x){const L=x.target;L.removeEventListener("dispose",Gt),ce(L)}function ce(x){Ce(x),Pt.remove(x)}function Ce(x){const L=Pt.get(x).programs;L!==void 0&&(L.forEach(function(z){St.releaseProgram(z)}),x.isShaderMaterial&&St.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,z,H,D,et){L===null&&(L=zt);const ct=D.isMesh&&D.matrixWorld.determinant()<0,_t=yl(x,L,z,H,D);wt.setMaterial(H,ct);let xt=z.index,At=1;if(H.wireframe===!0){if(xt=Q.getWireframeAttribute(z),xt===void 0)return;At=2}const bt=z.drawRange,yt=z.attributes.position;let Zt=bt.start*At,ne=(bt.start+bt.count)*At;et!==null&&(Zt=Math.max(Zt,et.start*At),ne=Math.min(ne,(et.start+et.count)*At)),xt!==null?(Zt=Math.max(Zt,0),ne=Math.min(ne,xt.count)):yt!=null&&(Zt=Math.max(Zt,0),ne=Math.min(ne,yt.count));const ae=ne-Zt;if(ae<0||ae===1/0)return;te.setup(D,H,_t,z,xt);let Ue,Yt=mt;if(xt!==null&&(Ue=Z.get(xt),Yt=kt,Yt.setIndex(Ue)),D.isMesh)H.wireframe===!0?(wt.setLineWidth(H.wireframeLinewidth*Ht()),Yt.setMode(C.LINES)):Yt.setMode(C.TRIANGLES);else if(D.isLine){let Et=H.linewidth;Et===void 0&&(Et=1),wt.setLineWidth(Et*Ht()),D.isLineSegments?Yt.setMode(C.LINES):D.isLineLoop?Yt.setMode(C.LINE_LOOP):Yt.setMode(C.LINE_STRIP)}else D.isPoints?Yt.setMode(C.POINTS):D.isSprite&&Yt.setMode(C.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)Yt.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))Yt.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Et=D._multiDrawStarts,_e=D._multiDrawCounts,Kt=D._multiDrawCount,qe=xt?Z.get(xt).bytesPerElement:1,ei=Pt.get(H).currentProgram.getUniforms();for(let Ne=0;Ne<Kt;Ne++)ei.setValue(C,"_gl_DrawID",Ne),Yt.render(Et[Ne]/qe,_e[Ne])}else if(D.isInstancedMesh)Yt.renderInstances(Zt,ae,D.count);else if(z.isInstancedBufferGeometry){const Et=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,_e=Math.min(z.instanceCount,Et);Yt.renderInstances(Zt,ae,_e)}else Yt.render(Zt,ae)};function Xt(x,L,z){x.transparent===!0&&x.side===Ze&&x.forceSinglePass===!1?(x.side=Ie,x.needsUpdate=!0,is(x,L,z),x.side=Un,x.needsUpdate=!0,is(x,L,z),x.side=Ze):is(x,L,z)}this.compile=function(x,L,z=null){z===null&&(z=x),d=Wt.get(z),d.init(L),E.push(d),z.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(d.pushLight(D),D.castShadow&&d.pushShadow(D))}),x!==z&&x.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(d.pushLight(D),D.castShadow&&d.pushShadow(D))}),d.setupLights();const H=new Set;return x.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const et=D.material;if(et)if(Array.isArray(et))for(let ct=0;ct<et.length;ct++){const _t=et[ct];Xt(_t,z,D),H.add(_t)}else Xt(et,z,D),H.add(et)}),E.pop(),d=null,H},this.compileAsync=function(x,L,z=null){const H=this.compile(x,L,z);return new Promise(D=>{function et(){if(H.forEach(function(ct){Pt.get(ct).currentProgram.isReady()&&H.delete(ct)}),H.size===0){D(x);return}setTimeout(et,10)}Ot.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let Pe=null;function on(x){Pe&&Pe(x)}function Za(){Hn.stop()}function ja(){Hn.start()}const Hn=new Zc;Hn.setAnimationLoop(on),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(x){Pe=x,W.setAnimationLoop(x),x===null?Hn.stop():Hn.start()},W.addEventListener("sessionstart",Za),W.addEventListener("sessionend",ja),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(L),L=W.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,L,b),d=Wt.get(x,E.length),d.init(L),E.push(d),st.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),gt.setFromProjectionMatrix(st),X=this.localClippingEnabled,B=tt.init(this.clippingPlanes,X),M=dt.get(x,u.length),M.init(),u.push(M),W.enabled===!0&&W.isPresenting===!0){const et=y.xr.getDepthSensingMesh();et!==null&&Zs(et,L,-1/0,y.sortObjects)}Zs(x,L,0,y.sortObjects),M.finish(),y.sortObjects===!0&&M.sort(G,lt),qt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,qt&&Rt.addToRenderList(M,x),this.info.render.frame++,B===!0&&tt.beginShadows();const z=d.state.shadowsArray;pt.render(z,x,L),B===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=M.opaque,D=M.transmissive;if(d.setupLights(),L.isArrayCamera){const et=L.cameras;if(D.length>0)for(let ct=0,_t=et.length;ct<_t;ct++){const xt=et[ct];Qa(H,D,x,xt)}qt&&Rt.render(x);for(let ct=0,_t=et.length;ct<_t;ct++){const xt=et[ct];Ja(M,x,xt,xt.viewport)}}else D.length>0&&Qa(H,D,x,L),qt&&Rt.render(x),Ja(M,x,L);b!==null&&(T.updateMultisampleRenderTarget(b),T.updateRenderTargetMipmap(b)),x.isScene===!0&&x.onAfterRender(y,x,L),te.resetDefaultState(),I=-1,j=null,E.pop(),E.length>0?(d=E[E.length-1],B===!0&&tt.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,u.pop(),u.length>0?M=u[u.length-1]:M=null};function Zs(x,L,z,H){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||gt.intersectsSprite(x)){H&&Tt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(st);const ct=$.update(x),_t=x.material;_t.visible&&M.push(x,ct,_t,z,Tt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||gt.intersectsObject(x))){const ct=$.update(x),_t=x.material;if(H&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Tt.copy(x.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Tt.copy(ct.boundingSphere.center)),Tt.applyMatrix4(x.matrixWorld).applyMatrix4(st)),Array.isArray(_t)){const xt=ct.groups;for(let At=0,bt=xt.length;At<bt;At++){const yt=xt[At],Zt=_t[yt.materialIndex];Zt&&Zt.visible&&M.push(x,ct,Zt,z,Tt.z,yt)}}else _t.visible&&M.push(x,ct,_t,z,Tt.z,null)}}const et=x.children;for(let ct=0,_t=et.length;ct<_t;ct++)Zs(et[ct],L,z,H)}function Ja(x,L,z,H){const D=x.opaque,et=x.transmissive,ct=x.transparent;d.setupLightsView(z),B===!0&&tt.setGlobalState(y.clippingPlanes,z),H&&wt.viewport(g.copy(H)),D.length>0&&ns(D,L,z),et.length>0&&ns(et,L,z),ct.length>0&&ns(ct,L,z),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Qa(x,L,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[H.id]===void 0&&(d.state.transmissionRenderTarget[H.id]=new ti(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?ts:_n,minFilter:Jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const et=d.state.transmissionRenderTarget[H.id],ct=H.viewport||g;et.setSize(ct.z,ct.w);const _t=y.getRenderTarget();y.setRenderTarget(et),y.getClearColor(O),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear(),qt&&Rt.render(z);const xt=y.toneMapping;y.toneMapping=Ln;const At=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),d.setupLightsView(H),B===!0&&tt.setGlobalState(y.clippingPlanes,H),ns(x,z,H),T.updateMultisampleRenderTarget(et),T.updateRenderTargetMipmap(et),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let bt=!1;for(let yt=0,Zt=L.length;yt<Zt;yt++){const ne=L[yt],ae=ne.object,Ue=ne.geometry,Yt=ne.material,Et=ne.group;if(Yt.side===Ze&&ae.layers.test(H.layers)){const _e=Yt.side;Yt.side=Ie,Yt.needsUpdate=!0,to(ae,z,H,Ue,Yt,Et),Yt.side=_e,Yt.needsUpdate=!0,bt=!0}}bt===!0&&(T.updateMultisampleRenderTarget(et),T.updateRenderTargetMipmap(et))}y.setRenderTarget(_t),y.setClearColor(O,V),At!==void 0&&(H.viewport=At),y.toneMapping=xt}function ns(x,L,z){const H=L.isScene===!0?L.overrideMaterial:null;for(let D=0,et=x.length;D<et;D++){const ct=x[D],_t=ct.object,xt=ct.geometry,At=H===null?ct.material:H,bt=ct.group;_t.layers.test(z.layers)&&to(_t,L,z,xt,At,bt)}}function to(x,L,z,H,D,et){x.onBeforeRender(y,L,z,H,D,et),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),D.onBeforeRender(y,L,z,H,x,et),D.transparent===!0&&D.side===Ze&&D.forceSinglePass===!1?(D.side=Ie,D.needsUpdate=!0,y.renderBufferDirect(z,L,H,D,x,et),D.side=Un,D.needsUpdate=!0,y.renderBufferDirect(z,L,H,D,x,et),D.side=Ze):y.renderBufferDirect(z,L,H,D,x,et),x.onAfterRender(y,L,z,H,D,et)}function is(x,L,z){L.isScene!==!0&&(L=zt);const H=Pt.get(x),D=d.state.lights,et=d.state.shadowsArray,ct=D.state.version,_t=St.getParameters(x,D.state,et,L,z),xt=St.getProgramCacheKey(_t);let At=H.programs;H.environment=x.isMeshStandardMaterial?L.environment:null,H.fog=L.fog,H.envMap=(x.isMeshStandardMaterial?F:v).get(x.envMap||H.environment),H.envMapRotation=H.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,At===void 0&&(x.addEventListener("dispose",Gt),At=new Map,H.programs=At);let bt=At.get(xt);if(bt!==void 0){if(H.currentProgram===bt&&H.lightsStateVersion===ct)return no(x,_t),bt}else _t.uniforms=St.getUniforms(x),x.onBeforeCompile(_t,y),bt=St.acquireProgram(_t,xt),At.set(xt,bt),H.uniforms=_t.uniforms;const yt=H.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(yt.clippingPlanes=tt.uniform),no(x,_t),H.needsLights=Tl(x),H.lightsStateVersion=ct,H.needsLights&&(yt.ambientLightColor.value=D.state.ambient,yt.lightProbe.value=D.state.probe,yt.directionalLights.value=D.state.directional,yt.directionalLightShadows.value=D.state.directionalShadow,yt.spotLights.value=D.state.spot,yt.spotLightShadows.value=D.state.spotShadow,yt.rectAreaLights.value=D.state.rectArea,yt.ltc_1.value=D.state.rectAreaLTC1,yt.ltc_2.value=D.state.rectAreaLTC2,yt.pointLights.value=D.state.point,yt.pointLightShadows.value=D.state.pointShadow,yt.hemisphereLights.value=D.state.hemi,yt.directionalShadowMap.value=D.state.directionalShadowMap,yt.directionalShadowMatrix.value=D.state.directionalShadowMatrix,yt.spotShadowMap.value=D.state.spotShadowMap,yt.spotLightMatrix.value=D.state.spotLightMatrix,yt.spotLightMap.value=D.state.spotLightMap,yt.pointShadowMap.value=D.state.pointShadowMap,yt.pointShadowMatrix.value=D.state.pointShadowMatrix),H.currentProgram=bt,H.uniformsList=null,bt}function eo(x){if(x.uniformsList===null){const L=x.currentProgram.getUniforms();x.uniformsList=Ns.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function no(x,L){const z=Pt.get(x);z.outputColorSpace=L.outputColorSpace,z.batching=L.batching,z.batchingColor=L.batchingColor,z.instancing=L.instancing,z.instancingColor=L.instancingColor,z.instancingMorph=L.instancingMorph,z.skinning=L.skinning,z.morphTargets=L.morphTargets,z.morphNormals=L.morphNormals,z.morphColors=L.morphColors,z.morphTargetsCount=L.morphTargetsCount,z.numClippingPlanes=L.numClippingPlanes,z.numIntersection=L.numClipIntersection,z.vertexAlphas=L.vertexAlphas,z.vertexTangents=L.vertexTangents,z.toneMapping=L.toneMapping}function yl(x,L,z,H,D){L.isScene!==!0&&(L=zt),T.resetTextureUnits();const et=L.fog,ct=H.isMeshStandardMaterial?L.environment:null,_t=b===null?y.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:On,xt=(H.isMeshStandardMaterial?F:v).get(H.envMap||ct),At=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,bt=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),yt=!!z.morphAttributes.position,Zt=!!z.morphAttributes.normal,ne=!!z.morphAttributes.color;let ae=Ln;H.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(ae=y.toneMapping);const Ue=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Yt=Ue!==void 0?Ue.length:0,Et=Pt.get(H),_e=d.state.lights;if(B===!0&&(X===!0||x!==j)){const Be=x===j&&H.id===I;tt.setState(H,x,Be)}let Kt=!1;H.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==_e.state.version||Et.outputColorSpace!==_t||D.isBatchedMesh&&Et.batching===!1||!D.isBatchedMesh&&Et.batching===!0||D.isBatchedMesh&&Et.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Et.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Et.instancing===!1||!D.isInstancedMesh&&Et.instancing===!0||D.isSkinnedMesh&&Et.skinning===!1||!D.isSkinnedMesh&&Et.skinning===!0||D.isInstancedMesh&&Et.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Et.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Et.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Et.instancingMorph===!1&&D.morphTexture!==null||Et.envMap!==xt||H.fog===!0&&Et.fog!==et||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==tt.numPlanes||Et.numIntersection!==tt.numIntersection)||Et.vertexAlphas!==At||Et.vertexTangents!==bt||Et.morphTargets!==yt||Et.morphNormals!==Zt||Et.morphColors!==ne||Et.toneMapping!==ae||Et.morphTargetsCount!==Yt)&&(Kt=!0):(Kt=!0,Et.__version=H.version);let qe=Et.currentProgram;Kt===!0&&(qe=is(H,L,D));let ei=!1,Ne=!1,js=!1;const oe=qe.getUniforms(),vn=Et.uniforms;if(wt.useProgram(qe.program)&&(ei=!0,Ne=!0,js=!0),H.id!==I&&(I=H.id,Ne=!0),ei||j!==x){Vt.reverseDepthBuffer?(nt.copy(x.projectionMatrix),ph(nt),mh(nt),oe.setValue(C,"projectionMatrix",nt)):oe.setValue(C,"projectionMatrix",x.projectionMatrix),oe.setValue(C,"viewMatrix",x.matrixWorldInverse);const Be=oe.map.cameraPosition;Be!==void 0&&Be.setValue(C,Mt.setFromMatrixPosition(x.matrixWorld)),Vt.logarithmicDepthBuffer&&oe.setValue(C,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&oe.setValue(C,"isOrthographic",x.isOrthographicCamera===!0),j!==x&&(j=x,Ne=!0,js=!0)}if(D.isSkinnedMesh){oe.setOptional(C,D,"bindMatrix"),oe.setOptional(C,D,"bindMatrixInverse");const Be=D.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),oe.setValue(C,"boneTexture",Be.boneTexture,T))}D.isBatchedMesh&&(oe.setOptional(C,D,"batchingTexture"),oe.setValue(C,"batchingTexture",D._matricesTexture,T),oe.setOptional(C,D,"batchingIdTexture"),oe.setValue(C,"batchingIdTexture",D._indirectTexture,T),oe.setOptional(C,D,"batchingColorTexture"),D._colorsTexture!==null&&oe.setValue(C,"batchingColorTexture",D._colorsTexture,T));const Js=z.morphAttributes;if((Js.position!==void 0||Js.normal!==void 0||Js.color!==void 0)&&Ct.update(D,z,qe),(Ne||Et.receiveShadow!==D.receiveShadow)&&(Et.receiveShadow=D.receiveShadow,oe.setValue(C,"receiveShadow",D.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(vn.envMap.value=xt,vn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&L.environment!==null&&(vn.envMapIntensity.value=L.environmentIntensity),Ne&&(oe.setValue(C,"toneMappingExposure",y.toneMappingExposure),Et.needsLights&&El(vn,js),et&&H.fog===!0&&at.refreshFogUniforms(vn,et),at.refreshMaterialUniforms(vn,H,Y,k,d.state.transmissionRenderTarget[x.id]),Ns.upload(C,eo(Et),vn,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ns.upload(C,eo(Et),vn,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&oe.setValue(C,"center",D.center),oe.setValue(C,"modelViewMatrix",D.modelViewMatrix),oe.setValue(C,"normalMatrix",D.normalMatrix),oe.setValue(C,"modelMatrix",D.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Be=H.uniformsGroups;for(let Qs=0,Al=Be.length;Qs<Al;Qs++){const io=Be[Qs];P.update(io,qe),P.bind(io,qe)}}return qe}function El(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function Tl(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(x,L,z){Pt.get(x.texture).__webglTexture=L,Pt.get(x.depthTexture).__webglTexture=z;const H=Pt.get(x);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,L){const z=Pt.get(x);z.__webglFramebuffer=L,z.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(x,L=0,z=0){b=x,U=L,w=z;let H=!0,D=null,et=!1,ct=!1;if(x){const xt=Pt.get(x);if(xt.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(C.FRAMEBUFFER,null),H=!1;else if(xt.__webglFramebuffer===void 0)T.setupRenderTarget(x);else if(xt.__hasExternalTextures)T.rebindTextures(x,Pt.get(x.texture).__webglTexture,Pt.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const yt=x.depthTexture;if(xt.__boundDepthTexture!==yt){if(yt!==null&&Pt.has(yt)&&(x.width!==yt.image.width||x.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(x)}}const At=x.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(ct=!0);const bt=Pt.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(bt[L])?D=bt[L][z]:D=bt[L],et=!0):x.samples>0&&T.useMultisampledRTT(x)===!1?D=Pt.get(x).__webglMultisampledFramebuffer:Array.isArray(bt)?D=bt[z]:D=bt,g.copy(x.viewport),S.copy(x.scissor),N=x.scissorTest}else g.copy(ft).multiplyScalar(Y).floor(),S.copy(vt).multiplyScalar(Y).floor(),N=it;if(wt.bindFramebuffer(C.FRAMEBUFFER,D)&&H&&wt.drawBuffers(x,D),wt.viewport(g),wt.scissor(S),wt.setScissorTest(N),et){const xt=Pt.get(x.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+L,xt.__webglTexture,z)}else if(ct){const xt=Pt.get(x.texture),At=L||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,xt.__webglTexture,z||0,At)}I=-1},this.readRenderTargetPixels=function(x,L,z,H,D,et,ct){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Pt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ct!==void 0&&(_t=_t[ct]),_t){wt.bindFramebuffer(C.FRAMEBUFFER,_t);try{const xt=x.texture,At=xt.format,bt=xt.type;if(!Vt.textureFormatReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-H&&z>=0&&z<=x.height-D&&C.readPixels(L,z,H,D,Lt.convert(At),Lt.convert(bt),et)}finally{const xt=b!==null?Pt.get(b).__webglFramebuffer:null;wt.bindFramebuffer(C.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(x,L,z,H,D,et,ct){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Pt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ct!==void 0&&(_t=_t[ct]),_t){const xt=x.texture,At=xt.format,bt=xt.type;if(!Vt.textureFormatReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=x.width-H&&z>=0&&z<=x.height-D){wt.bindFramebuffer(C.FRAMEBUFFER,_t);const yt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,yt),C.bufferData(C.PIXEL_PACK_BUFFER,et.byteLength,C.STREAM_READ),C.readPixels(L,z,H,D,Lt.convert(At),Lt.convert(bt),0);const Zt=b!==null?Pt.get(b).__webglFramebuffer:null;wt.bindFramebuffer(C.FRAMEBUFFER,Zt);const ne=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await dh(C,ne,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,yt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,et),C.deleteBuffer(yt),C.deleteSync(ne),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,L=null,z=0){x.isTexture!==!0&&(Us("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,x=arguments[1]);const H=Math.pow(2,-z),D=Math.floor(x.image.width*H),et=Math.floor(x.image.height*H),ct=L!==null?L.x:0,_t=L!==null?L.y:0;T.setTexture2D(x,0),C.copyTexSubImage2D(C.TEXTURE_2D,z,0,0,ct,_t,D,et),wt.unbindTexture()},this.copyTextureToTexture=function(x,L,z=null,H=null,D=0){x.isTexture!==!0&&(Us("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,x=arguments[1],L=arguments[2],D=arguments[3]||0,z=null);let et,ct,_t,xt,At,bt;z!==null?(et=z.max.x-z.min.x,ct=z.max.y-z.min.y,_t=z.min.x,xt=z.min.y):(et=x.image.width,ct=x.image.height,_t=0,xt=0),H!==null?(At=H.x,bt=H.y):(At=0,bt=0);const yt=Lt.convert(L.format),Zt=Lt.convert(L.type);T.setTexture2D(L,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,L.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,L.unpackAlignment);const ne=C.getParameter(C.UNPACK_ROW_LENGTH),ae=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ue=C.getParameter(C.UNPACK_SKIP_PIXELS),Yt=C.getParameter(C.UNPACK_SKIP_ROWS),Et=C.getParameter(C.UNPACK_SKIP_IMAGES),_e=x.isCompressedTexture?x.mipmaps[D]:x.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,_e.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,_e.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,_t),C.pixelStorei(C.UNPACK_SKIP_ROWS,xt),x.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,D,At,bt,et,ct,yt,Zt,_e.data):x.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,D,At,bt,_e.width,_e.height,yt,_e.data):C.texSubImage2D(C.TEXTURE_2D,D,At,bt,et,ct,yt,Zt,_e),C.pixelStorei(C.UNPACK_ROW_LENGTH,ne),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ue),C.pixelStorei(C.UNPACK_SKIP_ROWS,Yt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Et),D===0&&L.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),wt.unbindTexture()},this.copyTextureToTexture3D=function(x,L,z=null,H=null,D=0){x.isTexture!==!0&&(Us("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,x=arguments[2],L=arguments[3],D=arguments[4]||0);let et,ct,_t,xt,At,bt,yt,Zt,ne;const ae=x.isCompressedTexture?x.mipmaps[D]:x.image;z!==null?(et=z.max.x-z.min.x,ct=z.max.y-z.min.y,_t=z.max.z-z.min.z,xt=z.min.x,At=z.min.y,bt=z.min.z):(et=ae.width,ct=ae.height,_t=ae.depth,xt=0,At=0,bt=0),H!==null?(yt=H.x,Zt=H.y,ne=H.z):(yt=0,Zt=0,ne=0);const Ue=Lt.convert(L.format),Yt=Lt.convert(L.type);let Et;if(L.isData3DTexture)T.setTexture3D(L,0),Et=C.TEXTURE_3D;else if(L.isDataArrayTexture||L.isCompressedArrayTexture)T.setTexture2DArray(L,0),Et=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,L.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,L.unpackAlignment);const _e=C.getParameter(C.UNPACK_ROW_LENGTH),Kt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),qe=C.getParameter(C.UNPACK_SKIP_PIXELS),ei=C.getParameter(C.UNPACK_SKIP_ROWS),Ne=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ae.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ae.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,xt),C.pixelStorei(C.UNPACK_SKIP_ROWS,At),C.pixelStorei(C.UNPACK_SKIP_IMAGES,bt),x.isDataTexture||x.isData3DTexture?C.texSubImage3D(Et,D,yt,Zt,ne,et,ct,_t,Ue,Yt,ae.data):L.isCompressedArrayTexture?C.compressedTexSubImage3D(Et,D,yt,Zt,ne,et,ct,_t,Ue,ae.data):C.texSubImage3D(Et,D,yt,Zt,ne,et,ct,_t,Ue,Yt,ae),C.pixelStorei(C.UNPACK_ROW_LENGTH,_e),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Kt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,qe),C.pixelStorei(C.UNPACK_SKIP_ROWS,ei),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ne),D===0&&L.generateMipmaps&&C.generateMipmap(Et),wt.unbindTexture()},this.initRenderTarget=function(x){Pt.get(x).__webglFramebuffer===void 0&&T.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?T.setTextureCube(x,0):x.isData3DTexture?T.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?T.setTexture2DArray(x,0):T.setTexture2D(x,0),wt.unbindTexture()},this.resetState=function(){U=0,w=0,b=null,wt.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Oa?"display-p3":"srgb",e.unpackColorSpace=$t.workingColorSpace===qs?"display-p3":"srgb"}}class Ga{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=n}clone(){return new Ga(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class wm extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Rm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ta,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Te=new R;class Ws{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=sn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=sn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=sn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=sn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),s=jt(s,this.array),r=jt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new tn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ws(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class il extends Oi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Bt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let gi;const Xi=new R,_i=new R,vi=new R,xi=new Dt,qi=new Dt,sl=new se,As=new R,Yi=new R,bs=new R,Jo=new Dt,Lr=new Dt,Qo=new Dt;class Cm extends ge{constructor(t=new il){if(super(),this.isSprite=!0,this.type="Sprite",gi===void 0){gi=new We;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Rm(e,5);gi.setIndex([0,1,2,0,2,3]),gi.setAttribute("position",new Ws(n,3,0,!1)),gi.setAttribute("uv",new Ws(n,2,3,!1))}this.geometry=gi,this.material=t,this.center=new Dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_i.setFromMatrixScale(this.matrixWorld),sl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),vi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_i.multiplyScalar(-vi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ws(As.set(-.5,-.5,0),vi,a,_i,s,r),ws(Yi.set(.5,-.5,0),vi,a,_i,s,r),ws(bs.set(.5,.5,0),vi,a,_i,s,r),Jo.set(0,0),Lr.set(1,0),Qo.set(1,1);let o=t.ray.intersectTriangle(As,Yi,bs,!1,Xi);if(o===null&&(ws(Yi.set(-.5,.5,0),vi,a,_i,s,r),Lr.set(0,1),o=t.ray.intersectTriangle(As,bs,Yi,!1,Xi),o===null))return;const c=t.ray.origin.distanceTo(Xi);c<t.near||c>t.far||e.push({distance:c,point:Xi.clone(),uv:Ge.getInterpolation(Xi,As,Yi,bs,Jo,Lr,Qo,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ws(i,t,e,n,s,r){xi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(qi.x=r*xi.x-s*xi.y,qi.y=s*xi.x+r*xi.y):qi.copy(xi),i.copy(t),i.x+=qi.x,i.y+=qi.y,i.applyMatrix4(sl)}class rl extends Re{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Va extends We{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new R,h=new Dt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,p=3;f<=e;f++,p+=3){const m=n+f/e*s;l.x=t*Math.cos(m),l.y=t*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[p]/t+1)/2,h.y=(a[p+1]/t+1)/2,c.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(o,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Va(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class nn extends We{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],p=[],m=[];let _=0;const M=[],d=n/2;let u=0;E(),a===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new fe(f,3)),this.setAttribute("normal",new fe(p,3)),this.setAttribute("uv",new fe(m,2));function E(){const A=new R,U=new R;let w=0;const b=(e-t)/n;for(let I=0;I<=r;I++){const j=[],g=I/r,S=g*(e-t)+t;for(let N=0;N<=s;N++){const O=N/s,V=O*c+o,q=Math.sin(V),k=Math.cos(V);U.x=S*q,U.y=-g*n+d,U.z=S*k,f.push(U.x,U.y,U.z),A.set(q,b,k).normalize(),p.push(A.x,A.y,A.z),m.push(O,1-g),j.push(_++)}M.push(j)}for(let I=0;I<s;I++)for(let j=0;j<r;j++){const g=M[j][I],S=M[j+1][I],N=M[j+1][I+1],O=M[j][I+1];t>0&&(h.push(g,S,O),w+=3),e>0&&(h.push(S,N,O),w+=3)}l.addGroup(u,w,0),u+=w}function y(A){const U=_,w=new Dt,b=new R;let I=0;const j=A===!0?t:e,g=A===!0?1:-1;for(let N=1;N<=s;N++)f.push(0,d*g,0),p.push(0,g,0),m.push(.5,.5),_++;const S=_;for(let N=0;N<=s;N++){const V=N/s*c+o,q=Math.cos(V),k=Math.sin(V);b.x=j*k,b.y=d*g,b.z=j*q,f.push(b.x,b.y,b.z),p.push(0,g,0),w.x=q*.5+.5,w.y=k*.5*g+.5,m.push(w.x,w.y),_++}for(let N=0;N<s;N++){const O=U+N,V=S+N;A===!0?h.push(V,V+1,O):h.push(V+1,V,O),I+=3}l.addGroup(u,I,A===!0?1:2),u+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wa extends We{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let f=t;const p=(e-t)/s,m=new R,_=new Dt;for(let M=0;M<=s;M++){for(let d=0;d<=n;d++){const u=r+d/n*a;m.x=f*Math.cos(u),m.y=f*Math.sin(u),c.push(m.x,m.y,m.z),l.push(0,0,1),_.x=(m.x/e+1)/2,_.y=(m.y/e+1)/2,h.push(_.x,_.y)}f+=p}for(let M=0;M<s;M++){const d=M*(n+1);for(let u=0;u<n;u++){const E=u+d,y=E,A=E+n+1,U=E+n+2,w=E+1;o.push(y,A,w),o.push(A,U,w)}}this.setIndex(o),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(l,3)),this.setAttribute("uv",new fe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wa(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class zn extends We{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],f=new R,p=new R,m=[],_=[],M=[],d=[];for(let u=0;u<=n;u++){const E=[],y=u/n;let A=0;u===0&&a===0?A=.5/e:u===n&&c===Math.PI&&(A=-.5/e);for(let U=0;U<=e;U++){const w=U/e;f.x=-t*Math.cos(s+w*r)*Math.sin(a+y*o),f.y=t*Math.cos(a+y*o),f.z=t*Math.sin(s+w*r)*Math.sin(a+y*o),_.push(f.x,f.y,f.z),p.copy(f).normalize(),M.push(p.x,p.y,p.z),d.push(w+A,1-y),E.push(l++)}h.push(E)}for(let u=0;u<n;u++)for(let E=0;E<e;E++){const y=h[u][E+1],A=h[u][E],U=h[u+1][E],w=h[u+1][E+1];(u!==0||a>0)&&m.push(y,A,w),(u!==n-1||c<Math.PI)&&m.push(A,U,w)}this.setIndex(m),this.setAttribute("position",new fe(_,3)),this.setAttribute("normal",new fe(M,3)),this.setAttribute("uv",new fe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class he extends Oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xa extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Pm extends Xa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Dr=new se,tc=new R,ec=new R;class al{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ha,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;tc.setFromMatrixPosition(t.matrixWorld),e.position.copy(tc),ec.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ec),e.updateMatrixWorld(),Dr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const nc=new se,Ki=new R,Ir=new R;class Lm extends al{constructor(){super(new ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Dt(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ki.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ki),Ir.copy(n.position),Ir.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ir),n.updateMatrixWorld(),s.makeTranslation(-Ki.x,-Ki.y,-Ki.z),nc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nc)}}class ji extends Xa{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Lm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Dm extends al{constructor(){super(new jc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Im extends Xa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new Dm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Um{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ic(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ic();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ic(){return performance.now()}const sc=new se;class Nm{constructor(t,e,n=0,s=1/0){this.ray=new Vc(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ba,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return sc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sc),this}intersectObject(t,e=!0,n=[]){return wa(t,this,n,e),n.sort(rc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)wa(t[s],this,n,e);return n.sort(rc),n}}function rc(i,t){return i.distance-t.distance}function wa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)wa(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pa);function qa(i,t,e,n,s,r){ac(i,i.x+t,i.z,n,s,r),ac(i,i.x,i.z+e,n,s,r)}function ol(i,t,e,n,s,r,a,o){let c=0,l=1;const h=e-i,f=n-t,p=(m,_)=>{if(m===0)return _>=0;const M=_/m;if(m<0){if(M>l)return!1;M>c&&(c=M)}else{if(M<c)return!1;M<l&&(l=M)}return!0};return p(-h,i-s)&&p(h,a-i)&&p(-f,t-r)&&p(f,o-t)?c<=l:!1}function cl(i,t,e,n,s,r,a){let o=0,c=1;const l=n-i,h=s-t,f=r-e,p=(m,_)=>{if(m===0)return _>=0;const M=_/m;if(m<0){if(M>c)return!1;M>o&&(o=M)}else{if(M<o)return!1;M<c&&(c=M)}return!0};return p(-l,i-a.min.x)&&p(l,a.max.x-i)&&p(-h,t-a.min.y)&&p(h,a.max.y-t)&&p(-f,e-a.min.z)&&p(f,a.max.z-e)&&o<=c?o:1/0}function Ai(i,t,e,n=1.4,s=1.1){const r=(i.y||0)+n,a=(t.y||0)+s;for(const o of e)if(cl(i.x,r,i.z,t.x,a,t.z,o)<1/0)return!1;return!0}function ac(i,t,e,n,s,r){if(!(t<r.minX||t>r.maxX||e<r.minZ||e>r.maxZ)){for(const a of n)if(t>a.min.x-s&&t<a.max.x+s&&e>a.min.z-s&&e<a.max.z+s){if(i.x>a.min.x-s&&i.x<a.max.x+s&&i.z>a.min.z-s&&i.z<a.max.z+s)continue;return}i.x=t,i.z=e}}const oc=Math.SQRT2;class Fm{constructor(t,e,n=1,s=.65){this.bounds=t,this.cell=n,this.w=Math.ceil((t.maxX-t.minX)/n),this.h=Math.ceil((t.maxZ-t.minZ)/n);const r=this.w*this.h;this.blocked=new Uint8Array(r);for(let a=0;a<this.h;a++)for(let o=0;o<this.w;o++){const c=t.minX+(o+.5)*n,l=t.minZ+(a+.5)*n;for(const h of e)if(c>h.min.x-s&&c<h.max.x+s&&l>h.min.z-s&&l<h.max.z+s){this.blocked[a*this.w+o]=1;break}}this._g=new Float64Array(r),this._f=new Float64Array(r),this._parent=new Int32Array(r),this._seen=new Int32Array(r),this._closed=new Int32Array(r),this._stamp=0,this._heap=[]}_gx(t){return Math.max(0,Math.min(this.w-1,Math.floor((t-this.bounds.minX)/this.cell)))}_gz(t){return Math.max(0,Math.min(this.h-1,Math.floor((t-this.bounds.minZ)/this.cell)))}_wx(t){return this.bounds.minX+(t+.5)*this.cell}_wz(t){return this.bounds.minZ+(t+.5)*this.cell}blockedAt(t,e){return!!this.blocked[this._gz(e)*this.w+this._gx(t)]}nearestOpen(t,e){const n=this._gx(t),s=this._gz(e);if(!this.blocked[s*this.w+n])return{x:t,z:e};for(let r=1;r<=14;r++)for(let a=-r;a<=r;a++)for(let o=-r;o<=r;o++){if(Math.max(Math.abs(o),Math.abs(a))!==r)continue;const c=n+o,l=s+a;if(!(c<0||l<0||c>=this.w||l>=this.h)&&!this.blocked[l*this.w+c])return{x:this._wx(c),z:this._wz(l)}}return{x:t,z:e}}isClear(t,e,n,s){const r=Math.hypot(n-t,s-e),a=Math.max(1,Math.ceil(r/(this.cell*.5)));for(let o=0;o<=a;o++){const c=o/a;if(this.blockedAt(t+(n-t)*c,e+(s-e)*c))return!1}return!0}_push(t){const e=this._heap,n=this._f;e.push(t);let s=e.length-1;for(;s>0;){const r=s-1>>1;if(n[e[r]]<=n[e[s]])break;[e[r],e[s]]=[e[s],e[r]],s=r}}_pop(){const t=this._heap,e=this._f,n=t[0],s=t.pop();if(t.length){t[0]=s;let r=0;for(;;){const a=r*2+1,o=a+1;let c=r;if(a<t.length&&e[t[a]]<e[t[c]]&&(c=a),o<t.length&&e[t[o]]<e[t[c]]&&(c=o),c===r)break;[t[r],t[c]]=[t[c],t[r]],r=c}}return n}findPath(t,e,n,s){const r=this.w,a=this.h;let o=this._gx(t),c=this._gz(e),l=this._gx(n),h=this._gz(s);if(this.blocked[c*r+o]){const g=this.nearestOpen(t,e);o=this._gx(g.x),c=this._gz(g.z)}if(this.blocked[h*r+l]){const g=this.nearestOpen(n,s);l=this._gx(g.x),h=this._gz(g.z)}const f=c*r+o,p=h*r+l;if(this.blocked[f]||this.blocked[p])return null;if(f===p)return[{x:this._wx(l),z:this._wz(h)}];const m=++this._stamp,_=this._g,M=this._f,d=this._parent,u=this._seen,E=this._closed;this._heap.length=0;const y=g=>{const S=Math.abs(g%r-l),N=Math.abs((g/r|0)-h);return Math.min(S,N)*oc+Math.abs(S-N)};_[f]=0,M[f]=y(f),d[f]=-1,u[f]=m,this._push(f);let A=!1,U=4e4;for(;this._heap.length&&U-- >0;){const g=this._pop();if(E[g]===m)continue;if(E[g]=m,g===p){A=!0;break}const S=g%r,N=g/r|0;for(let O=-1;O<=1;O++)for(let V=-1;V<=1;V++){if(V===0&&O===0)continue;const q=S+V,k=N+O;if(q<0||k<0||q>=r||k>=a)continue;const Y=k*r+q;if(this.blocked[Y]||E[Y]===m||V!==0&&O!==0&&(this.blocked[N*r+q]||this.blocked[k*r+S]))continue;const G=_[g]+(V!==0&&O!==0?oc:1);(u[Y]!==m||G<_[Y])&&(u[Y]=m,_[Y]=G,M[Y]=G+y(Y),d[Y]=g,this._push(Y))}}if(!A)return null;const w=[];for(let g=p;g!==-1;g=d[g])w.push(g);w.reverse();const b=[];for(let g=0;g<w.length;g++){if(g>0&&g<w.length-1){const S=w[g-1],N=w[g],O=w[g+1],V=N%r-S%r,q=(N/r|0)-(S/r|0),k=O%r-N%r,Y=(O/r|0)-(N/r|0);if(V===k&&q===Y)continue}b.push({x:this._wx(w[g]%r),z:this._wz(w[g]/r|0)})}const I=[];let j=0;for(;j<b.length-1;){let g=b.length-1;for(;g>j+1&&!this.isClear(b[j].x,b[j].z,b[g].x,b[g].z);)g--;I.push(b[g]),j=g}return I.length?I:[b[b.length-1]]}}function yi(i,t,e,n,s,r,a,o,c){const l=s*r;let h,f;if(i.isClear(e.x,e.z,n.x,n.z))t._navPath=null,h=n.x,f=n.z;else{const u=t._navPath&&Math.hypot(n.x-t._navGoalX,n.z-t._navGoalZ)>2;if((!t._navPath||u)&&(t._navPath=i.findPath(e.x,e.z,n.x,n.z),t._navGoalX=n.x,t._navGoalZ=n.z,!t._navPath))return null;const E=t._navPath;for(;E.length>1&&Math.hypot(E[0].x-e.x,E[0].z-e.z)<.8;)E.shift();h=E[0].x,f=E[0].z}const p=h-e.x,m=f-e.z,_=Math.hypot(p,m);if(_<1e-4)return null;const M=e.x,d=e.z;return qa(e,p/_*Math.min(l,_),m/_*Math.min(l,_),a,o,c),Math.hypot(e.x-M,e.z-d)<l*.25?(t._navStuck=(t._navStuck||0)+r,t._navStuck>.5&&(t._navPath=null,t._navStuck=0)):t._navStuck=0,{x:p/_,z:m/_}}const be=1.4,K=be,xe={minX:-6.5*K,maxX:153.5*K,minZ:-45*K,maxZ:45*K};function Ks(i,t,e=1,n=1){const s=document.createElement("canvas");s.width=s.height=i,t(s.getContext("2d"),i);const r=new rl(s);return r.wrapS=r.wrapT=zs,r.repeat.set(e,n),r.colorSpace=ke,r.anisotropy=4,r}function Om(){return Ks(512,(i,t)=>{i.fillStyle="#7a5028",i.fillRect(0,0,t,t);const e=6;for(let n=0;n<e;n++){const s=n/e*t,r=t/e,a=18-Math.abs(n*73%37-18);i.fillStyle=`rgb(${112+a},${74+a*.7},${38+a*.4})`,i.fillRect(0,s,t,r),i.strokeStyle="rgba(60,35,12,0.25)",i.lineWidth=1.5;for(let c=0;c<7;c++){i.beginPath();const l=s+(c+.5)*(r/7)+Math.sin(n*5+c)*2;i.moveTo(0,l);for(let h=0;h<=t;h+=32)i.lineTo(h,l+Math.sin(h*.02+n*9+c*3)*2.5);i.stroke()}i.fillStyle="rgba(35,18,5,0.85)",i.fillRect(0,s,t,3);const o=n*197%t;i.fillRect(o,s,3,r)}},17,11)}function zm(){return Ks(512,(i,t)=>{const e=t/2,n=t/2;i.fillStyle="#6e1c18",i.fillRect(0,0,t,t);const s=[[t*.485,"#caa24a",t*.02],[t*.44,"#2a2f55",t*.012],[t*.3,"#caa24a",t*.014],[t*.2,"#d8cfae",t*.01],[t*.09,"#2a2f55",t*.05]];for(const[r,a,o]of s)i.strokeStyle=a,i.lineWidth=o,i.beginPath(),i.arc(e,n,r,0,Math.PI*2),i.stroke();for(let r=0;r<4e3;r++){const a=Math.random()*t,o=Math.random()*t;i.fillStyle=`rgba(0,0,0,${Math.random()*.08})`,i.fillRect(a,o,2,1)}})}function Bm(){return Ks(256,(i,t)=>{i.fillStyle="#cfc5ae",i.fillRect(0,0,t,t),i.fillStyle="rgba(176,164,138,0.5)";for(let e=0;e<t;e+=32)i.fillRect(e,0,14,t);for(let e=0;e<600;e++)i.fillStyle=`rgba(110,100,80,${Math.random()*.05})`,i.fillRect(Math.random()*t,Math.random()*t,2,2)},14,1.4)}function Hm(i){return Ks(128,(t,e)=>{t.fillStyle=i,t.fillRect(0,0,e,e);for(let n=0;n<e;n+=3)t.fillStyle=`rgba(255,255,255,${n%6?.03:.05})`,t.fillRect(0,n,e,1);for(let n=0;n<e;n+=3)t.fillStyle="rgba(0,0,0,0.045)",t.fillRect(n,0,1,e)},5,5)}function km(){const i=new wm;i.background=new Bt(2305088),i.fog=new Ga(2305088,180,475),i.add(new Pm(4608906,5784626,1.12));const t=new Im(16757865,1.6);t.position.set(-84,64,25),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-45,t.shadow.camera.right=240,t.shadow.camera.top=85,t.shadow.camera.bottom=-85,t.shadow.camera.far=460,t.shadow.bias=-4e-4,i.add(t);const e=[],n=[],s=(it,gt,B,X,nt,st,{y:Mt,obstacle:Tt=!0,cover:zt=!1,rough:qt=.85}={})=>{(gt>=3||Mt!==void 0&&Mt>3)&&(it*=K,gt*=K,B*=K),X*=K,nt*=K,Mt=Mt!==void 0?Mt*K:gt/2;const C=new Ft(new ve(it,gt,B),new he({color:st,roughness:qt}));if(C.position.set(X,Mt,nt),C.castShadow=!0,C.receiveShadow=!0,i.add(C),Tt&&e.push(new rn(new R(X-it/2,0,nt-B/2),new R(X+it/2,gt,nt+B/2))),zt){const Me=it/2+1.4,Ot=B/2+1.4;n.push(new R(X+Me,0,nt),new R(X-Me,0,nt),new R(X,0,nt+Ot),new R(X,0,nt-Ot))}return C},r=new Ft(new Rn(165*K,95*K),new he({map:Om(),roughness:.62}));r.rotation.x=-Math.PI/2,r.position.set(73.5*K,0,0),r.receiveShadow=!0,i.add(r);const a=new Ft(new Va(11*K,48),new he({map:zm(),roughness:.95}));a.rotation.x=-Math.PI/2,a.position.set(28*K,.02,0),a.scale.x=1.4,a.receiveShadow=!0,i.add(a);const o=new Ft(new Rn(61*K,45*K),new he({color:11117721,roughness:.7}));o.rotation.x=-Math.PI/2,o.position.set(123.5*K,.015,-23*K),o.receiveShadow=!0,i.add(o);const c=new he({map:Bm(),roughness:.92}),l=new he({color:15262418,roughness:.6}),h=(it,gt,B,X)=>{it*=K,gt*=K,B*=K,X*=K;const nt=12*K,st=new Ft(new ve(it,nt,gt),c);st.position.set(B,nt/2,X),st.castShadow=!0,st.receiveShadow=!0,i.add(st),e.push(new rn(new R(B-it/2,0,X-gt/2),new R(B+it/2,nt,X+gt/2)));const Mt=new Ft(new ve(it+.16,.8,gt+.16),l);Mt.position.set(B,.4,X),Mt.receiveShadow=!0,i.add(Mt)};h(1,92,-7.5,0),h(163,1,73.5,-46),h(89.5,1,35.75,46),h(66,1,121.5,46),h(1,92,154.5,0),h(1,60.5,76,-15.75),h(1,24.5,76,34.25),h(1,18,93,-37),h(1,40,93,0),h(1,18,93,37),h(61.5,1,124.25,0);const f=new he({color:4165439,roughness:.5}),p=new Ft(new nn(1.6*K,1.1*K,9.5*K,14),f);p.position.set(-4.5*K,2.6*K,-9*K),p.rotation.z=1.15,p.rotation.y=.5,p.castShadow=!0,i.add(p);const m=new Ft(new ve(1.6*K,.22,10.5*K),f);m.position.set(-3.8*K,2.9*K,-8.6*K),m.rotation.y=.5,m.castShadow=!0,i.add(m);const _=new Ft(new ve(.18,2*K,1.4*K),f);_.position.set(-7.2*K,4.2*K,-11.4*K),_.castShadow=!0,i.add(_),e.push(new rn(new R(-7*K,0,-11*K),new R(-2*K,4*K,-7*K))),n.push(new R(-.5*K,0,-9*K),new R(-4.5*K,0,-5.5*K)),s(1.3,1.3,1.3,1.5,7.5,8014370,{cover:!0});const M=new he({map:Hm("#3e4a5c"),roughness:.95}),d=(it,gt,B,X,nt,st)=>{it*=K,gt*=K,B*=K,X*=K,nt*=K,st*=K;const Mt=new Ft(new ve(it,gt,B),M);Mt.position.set(X,nt,st),Mt.castShadow=Mt.receiveShadow=!0,i.add(Mt),e.push(new rn(new R(X-it/2,0,st-B/2),new R(X+it/2,nt+gt/2,st+B/2)))};d(30,4.5,8,26,2.25,-41.5),d(30,10,2.2,26,5,-44.6),d(2.8,7.2,9,10.9,3.6,-41.5),d(2.8,7.2,9,41.1,3.6,-41.5),s(15,.8,10.5,28,3,2823945,{y:6.2,obstacle:!1});for(const[it,gt]of[[21.8,-1.3],[34.2,-1.3],[21.8,7.3],[34.2,7.3]])s(1,5.8,1,it,gt,2823945,{cover:!0});s(8,3.4,6,43,27,4082268,{cover:!0});const u=[10098706,1718938,10122770];[[11,-10,1.5],[15,6.5,1.7],[19.5,-17,1.4],[17.5,21,1.55],[34.5,-7,1.6],[39,9,1.35],[42,-21,1.8],[47,18,1.5],[51,-9,1.45],[24.5,-29,1.6],[54,25,1.4],[57,-24,1.5]].forEach(([it,gt,B],X)=>s(B,B,B,it,gt,u[X%3],{cover:!0,rough:.35})),s(3.2,.5,2.2,19,14,7216152,{obstacle:!1}),s(3,.45,2.1,36,-15,1858090,{obstacle:!1}),s(3.4,1.1,2.4,47,-18,1858090,{cover:!0}),s(1,9.5,12,74.2,0,2823945);for(let it=0;it<5;it++)s(.5,3,1.7,72.5,-6+it*3,it%2?1858090:7216152,{cover:!0});s(3.4,.85,.9,44.5,-1.5,9075274,{cover:!0}),s(1.35,1.35,1.35,43.5,3.5,8014370,{cover:!0}),s(.9,.85,3.4,62.5,-13,9075274,{cover:!0}),s(.9,.85,3.4,63,0,9075274,{cover:!0}),s(.9,.85,3.4,62.5,13,9075274,{cover:!0}),s(1.35,1.4,1.35,65,-6.5,8014370,{cover:!0}),s(1.35,1.4,1.35,65.2,7,8014370,{cover:!0}),s(1.8,.5,7,90.5,-5,2823945,{y:5,obstacle:!1}),s(1,5,1,90.5,-7.8,2823945,{cover:!0}),s(1,5,1,90.5,-2.2,2823945,{cover:!0}),s(1.4,1.4,1.4,81,-9,10098706,{cover:!0,rough:.35}),s(1.5,1.5,1.5,87.5,6,1718938,{cover:!0,rough:.35}),s(1.3,1.3,1.3,82.5,21,10122770,{cover:!0,rough:.35}),s(3,.45,2.1,85.5,-25,1858090,{obstacle:!1}),s(4,14.5,4.5,149,-39,13617597),s(9,.7,6,120,-23,2823945,{y:6.5,obstacle:!1});for(const[it,gt]of[[116.3,-25.2],[123.7,-25.2],[116.3,-20.8],[123.7,-20.8]])s(.9,6.4,.9,it,gt,2823945,{cover:!0});s(2.4,3.8,2.4,106.5,-15,2823945,{cover:!0}),s(1.5,1.5,1.5,115,-9,1718938,{cover:!0,rough:.35}),s(1.6,2.3,1.6,129,-8,5906456,{cover:!0}),s(1.3,1.4,1.3,138,-33,8014370,{cover:!0}),s(10,.65,5,126,23,2823945,{y:6.2,obstacle:!1});for(const[it,gt]of[[121.7,21],[130.3,21],[121.7,25],[130.3,25]])s(.8,6.2,.8,it,gt,2823945,{cover:!0});for(let it=0;it<3;it++)s(.5,3,1.7,112,33+it*3,it%2?7216152:1858090,{cover:!0});s(2.8,.42,2,118,15,7216152,{obstacle:!1}),s(1.6,1.6,1.6,136,12,10122770,{cover:!0,rough:.35}),s(1.3,1.3,1.3,103,26,10098706,{cover:!0,rough:.35});const E=new Ft(new nn(1.1*K,1.4*K,.4,16),new he({color:3812380,roughness:.5}));E.position.set(50*K,.2,-36*K),E.castShadow=!0,i.add(E);const y=new Ft(new nn(.22,.22,12*K,10),new he({color:3812380,roughness:.5}));y.position.set(50*K,6.2*K,-36*K),y.castShadow=!0,i.add(y);const A=new Ft(new nn(1.9*K,2.6*K,3.2*K,16,1,!0),new he({color:15916206,roughness:.9,emissive:16767392,emissiveIntensity:.55,side:Ze}));A.position.set(50*K,12.2*K,-36*K),i.add(A);const U=new ji(16763018,130,64,1.8);U.position.set(50*K,11*K,-36*K),i.add(U),e.push(new rn(new R(48.9*K,0,-36.6*K),new R(50.9*K,12*K,-35.4*K)));const w=new ji(16763018,52,45,1.8);w.position.set(126*K,12,30*K),i.add(w);const b=new ji(13623551,38,42,1.8);b.position.set(122*K,12,-24*K),i.add(b);const I=new Qe({color:16757865}),j=new Ft(new Rn(11*K,7*K),I);j.position.set(-6.9*K,7*K,-9*K),j.rotation.y=Math.PI/2,i.add(j);for(const[it,gt,B,X]of[[12,.7,3.4,-9],[12,.7,10.6,-9],[.7,8,7,-14.6],[.7,8,7,-3.4],[.7,8,7,-9]]){const nt=new Ft(new ve(.6,gt*K,(it===.7?.7:it)*K),new he({color:4864044,roughness:.6}));nt.position.set(-6.8*K,B*K,X*K),i.add(nt)}for(const[it,gt]of[[14,3494026],[36,9069621],[58,4880970]]){const B=new Ft(new ve(5.4*K,4.2*K,.3),new he({color:2824716,roughness:.5}));B.position.set(it*K,7.4*K,-45.3*K),i.add(B);const X=new Ft(new Rn(4.4*K,3.2*K),new he({color:gt,roughness:.9}));X.position.set(it*K,7.4*K,-45.1*K),i.add(X)}const g={x:84.5*K,z:42.5*K,r:4.5*K},S=new Ft(new nn(g.r,g.r,.12,36),new Qe({color:4652906,transparent:!0,opacity:.3}));S.position.set(g.x,.07,g.z),i.add(S);const N=new ji(6981375,26,42);N.position.set(84.5*K,5,45*K),i.add(N),s(1.4,1.4,1.4,79,37,10098706,{cover:!0,rough:.35}),s(1.4,1.4,1.4,90,37,1718938,{cover:!0,rough:.35}),s(3.2,.85,.9,84.5,37.5,9075274,{cover:!0});const O=new he({color:3107631,roughness:.4}),V=[];for(let[it,gt]of[[89.5,-8],[132,-36],[126,13]]){it*=K,gt*=K;const B=new Ft(new ve(1.5,1,1.1),O);B.position.set(it,.8,gt),B.castShadow=!0,i.add(B);const X=new Ft(new nn(1.7,1.7,.1,24),new Qe({color:7012234,transparent:!0,opacity:.3}));X.position.set(it,.05,gt),i.add(X),V.push({x:it,z:gt,crate:B,ring:X,taken:!1})}const q=new Ti,k=new he({color:6052410,roughness:.5}),Y=new Ft(new ve(1.7,1.15,.95),k);Y.position.y=.58,Y.castShadow=!0,q.add(Y);const G=new Ft(new ve(.06,2.4,.06),k);G.position.set(.62,2.2,0),q.add(G);const lt=new Ft(new zn(.15,8,8),new Qe({color:16728112}));lt.position.set(-.55,1.25,.3),q.add(lt),q.position.set(136*K,0,28*K),i.add(q);const ft={pos:new R(136*K,0,28*K),alive:!0,hp:30,group:q,lamp:lt},vt=new Fm(xe,e);return{scene:i,obstacles:e,coverPoints:n,exit:g,exitGlow:S,nav:vt,supplies:V,radio:ft}}class Gm{constructor(t){this.keys={},this.pressed={},this.mouseDX=0,this.mouseDY=0,this.firing=!1,this.aiming=!1,this.locked=!1,this.debugLock=!1,this._dom=t,window.addEventListener("keydown",e=>{(e.code==="Tab"||e.code==="Space")&&e.preventDefault(),this.keys[e.code]||(this.pressed[e.code]=!0),this.keys[e.code]=!0}),window.addEventListener("keyup",e=>{this.keys[e.code]=!1}),window.addEventListener("mousemove",e=>{this.locked&&(this.mouseDX+=e.movementX,this.mouseDY+=e.movementY)}),window.addEventListener("mousedown",e=>{e.button===0&&(this.firing=!0),e.button===2&&(this.aiming=!0)}),window.addEventListener("mouseup",e=>{e.button===0&&(this.firing=!1),e.button===2&&(this.aiming=!1)}),window.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this._dom})}isDown(t){return!!this.keys[t]}consume(t){return this.pressed[t]?(this.pressed[t]=!1,!0):!1}requestLock(){this._dom.requestPointerLock()}endFrame(){this.mouseDX=0,this.mouseDY=0,this.pressed={}}}function ll(i,t={}){const e=(t.rifleLength??.9)+.55,n=t.bulky??!1,s=t.marking??"none",r=n?1.3:1,a=new Ti,o=new he({color:i,roughness:.32,metalness:0}),c=[o],l=(_,M,d,u,E=0,y=0,A=0,U=o)=>{const w=new Ft(_,U);return w.position.set(M,d,u),w.rotation.set(E,y,A),w.castShadow=!0,a.add(w),w},h=(_,M,d)=>new ve(_,M,d),f=l(new nn(.62,.68,.16,22),0,.08,.05);f.scale.z=1.55,l(h(.26*r,.92,.26),-.18*r,.56,.16,-.32),l(h(.26*r,.92,.26),.18*r,.55,-.16,.38),l(h(.52*r,.28,.36),0,1,0),l(h(.62*r,.78,.42*r),0,1.42,.04,.12),l(h(.3,.3,.28),0,1.93,.06),l(new zn(.34,12,9),0,2,.05).scale.set(1.04*r,.72,1.18),l(new nn(.38,.42,.07,14),0,1.9,.05);const m=l(h(.14,.2,e),.08*r,1.45,.55,-.04,-.14);if(l(h(.1,.3,.22),.05*r,1.28,.3),a.userData.rifle=m,l(h(.17*r,.52,.17),.34*r,1.4,.26,.95,0,-.3),l(h(.16*r,.56,.16),-.2*r,1.47,.42,1.1,0,.45),s==="cross"){const _=new he({color:16777215,roughness:.4});c.push(_),l(h(.26,.09,.03),0,1.5,.26*r,.12,0,0,_),l(h(.09,.26,.03),0,1.5,.26*r,.12,0,0,_)}else if(s==="leader"){l(h(.34,.42,.18),0,1.5,-.3*r);const _=l(h(.035,.85,.035),.12,2.05,-.32*r);_.castShadow=!1}return a.userData.muzzleOffset=new R(.08*r,1.45,.55+e/2+.08),a.userData.fadeMats=c,a}class Vm{constructor(){this.ctx=null,this.master=null}resume(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.master=this.ctx.createGain(),this.master.gain.value=.32,this.master.connect(this.ctx.destination),this._startAmbient()),this.ctx.state==="suspended"&&this.ctx.resume()}_noiseBuffer(t){const e=Math.floor(this.ctx.sampleRate*t),n=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=n.getChannelData(0);for(let r=0;r<e;r++)s[r]=Math.random()*2-1;return n}_env(t,e,n,s){const r=t.gain;r.setValueAtTime(1e-4,e),r.exponentialRampToValueAtTime(n,e+.005),r.exponentialRampToValueAtTime(1e-4,e+s)}gunshot(t=0){if(!this.ctx)return;const e=this.ctx.currentTime,n=Math.max(.05,1-t/60),s=this.ctx.createBufferSource();s.buffer=this._noiseBuffer(.14);const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.value=5200-t*60;const a=this.ctx.createGain();this._env(a,e,.9*n,.13),s.connect(r).connect(a).connect(this.master),s.start(e);const o=this.ctx.createOscillator();o.type="sine",o.frequency.setValueAtTime(140,e),o.frequency.exponentialRampToValueAtTime(45,e+.09);const c=this.ctx.createGain();this._env(c,e,.7*n,.1),o.connect(c).connect(this.master),o.start(e),o.stop(e+.12)}footstep(){if(!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createBufferSource();e.buffer=this._noiseBuffer(.05);const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.value=260+Math.random()*120;const s=this.ctx.createGain();this._env(s,t,.18,.05),e.connect(n).connect(s).connect(this.master),e.start(t)}kill(){if(!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator();e.type="square",e.frequency.setValueAtTime(520,t),e.frequency.exponentialRampToValueAtTime(190,t+.08);const n=this.ctx.createGain();this._env(n,t,.25,.1),e.connect(n).connect(this.master),e.start(t),e.stop(t+.12)}takedown(){if(!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator();e.type="sine",e.frequency.setValueAtTime(170,t),e.frequency.exponentialRampToValueAtTime(70,t+.09);const n=this.ctx.createGain();this._env(n,t,.22,.12),e.connect(n).connect(this.master),e.start(t),e.stop(t+.14)}reload(){if(this.ctx)for(const[t,e]of[[0,900],[.22,1300]]){const n=this.ctx.currentTime+t,s=this.ctx.createOscillator();s.type="square",s.frequency.value=e;const r=this.ctx.createGain();this._env(r,n,.12,.03),s.connect(r).connect(this.master),s.start(n),s.stop(n+.05)}}dry(){if(!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator();e.type="square",e.frequency.value=1600;const n=this.ctx.createGain();this._env(n,t,.08,.025),e.connect(n).connect(this.master),e.start(t),e.stop(t+.04)}pickup(){this.ctx&&[660,990].forEach((t,e)=>{const n=this.ctx.currentTime+e*.09,s=this.ctx.createOscillator();s.type="triangle",s.frequency.value=t;const r=this.ctx.createGain();this._env(r,n,.22,.16),s.connect(r).connect(this.master),s.start(n),s.stop(n+.25)})}objective(){this.ctx&&[523,659,880].forEach((t,e)=>{const n=this.ctx.currentTime+e*.11,s=this.ctx.createOscillator();s.type="triangle",s.frequency.value=t;const r=this.ctx.createGain();this._env(r,n,.26,.3),s.connect(r).connect(this.master),s.start(n),s.stop(n+.5)})}alarm(){if(this.ctx)for(let t=0;t<4;t++){const e=this.ctx.currentTime+t*.42,n=this.ctx.createOscillator();n.type="sawtooth",n.frequency.setValueAtTime(t%2?620:470,e);const s=this.ctx.createGain();this._env(s,e,.16,.36),n.connect(s).connect(this.master),n.start(e),n.stop(e+.4)}}sting(t){if(!this.ctx)return;const e=t?[523,659,784,1047]:[392,311,262],n=t?.13:.24;e.forEach((s,r)=>{const a=this.ctx.currentTime+r*n,o=this.ctx.createOscillator();o.type="triangle",o.frequency.value=s;const c=this.ctx.createGain();this._env(c,a,.3,t?.4:.6),o.connect(c).connect(this.master),o.start(a),o.stop(a+.8)})}_startAmbient(){const t=this.ctx.createBufferSource();t.buffer=this._noiseBuffer(4),t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.value=280;const n=this.ctx.createGain();n.gain.value=.05,t.connect(e).connect(n).connect(this.master),t.start()}}const De=new Vm,Wm=.0022,Xm=3.2,qm=2,Ee={FOLLOW:"follow",HOLD:"hold",MOVE:"move",ATTACK:"attack"};class Ym{constructor(t,e,n,s){this.cls=e,this.obstacles=n,this.nav=s,this.figure=ll(4165439,{rifleLength:e.rifleLength,bulky:e.bulky,marking:e.marking}),t.add(this.figure),this.position=new R,this.yaw=0,this.pitch=.25,this.maxHealth=e.hp,this.health=e.hp,this.alive=!0,this.downed=!1,this.crashDowned=!1,this.fireCooldown=0,this.abilityCd=0,this.mag=e.mag,this.reserve=e.reserve,this.reloading=0,this.dryCd=0,this.lastHitFrom=new R,this.lastHitAt=-1e9,this.suppressing=!1,this.zoomed=!1,this.aiming=!1,this.crouched=!1,this.sprinting=!1,this.order=Ee.FOLLOW,this.orderPoint=new R,this.target=null,this._f=new R,this._r=new R,this._t=new R}forwardVector(){return this._f.set(Math.sin(this.yaw),0,Math.cos(this.yaw))}muzzleWorldPosition(){return this.figure.localToWorld(this.figure.userData.muzzleOffset.clone())}fireInterval(){return this.suppressing?this.cls.fireInterval*.5:this.cls.fireInterval}spread(){let t=this.suppressing?this.cls.spread*2.5:this.cls.spread;return this.crouched&&(t*=.6),this.aiming&&(t*=.55),this.sprinting&&(t*=2.4),t}startReload(){this.reloading>0||this.mag>=this.cls.mag||this.reserve<=0||(this.reloading=this.cls.reload,De.reload())}update(t,e){if(!this.alive)return;if(this.fireCooldown-=t,this.abilityCd=Math.max(0,this.abilityCd-t),this.dryCd=Math.max(0,this.dryCd-t),this.reloading>0&&(this.reloading-=t,this.reloading<=0)){const r=Math.min(this.cls.mag-this.mag,this.reserve);this.mag+=r,this.reserve-=r,this.reloading=0}e.isActive?this._controlPlayer(e.input,t):this._controlAI(t,e),this.figure.position.copy(this.position),this.figure.rotation.y=this.yaw;const n=this.crouched?.66:1;this.figure.scale.y+=(n-this.figure.scale.y)*Math.min(1,t*14);const s=this.figure.userData.rifle;if(s){const r=this.aiming?.02:-.14;s.rotation.y+=(r-s.rotation.y)*Math.min(1,t*10)}}_controlPlayer(t,e){const n=Wm*(this.zoomed?.4:this.aiming?.65:1);this.yaw-=t.mouseDX*n,this.pitch+=t.mouseDY*n,this.pitch=Math.max(-.2,Math.min(.9,this.pitch));const s=this.forwardVector();this._r.set(s.z,0,-s.x);let r=0,a=0;t.isDown("KeyW")&&(r+=s.x,a+=s.z),t.isDown("KeyS")&&(r-=s.x,a-=s.z),t.isDown("KeyD")&&(r+=this._r.x,a+=this._r.z),t.isDown("KeyA")&&(r-=this._r.x,a-=this._r.z);const o=Math.hypot(r,a);if(this.sprinting=o>0&&t.isDown("ShiftLeft")&&!this.crouched,o>0){let c=this.cls.speed;this.sprinting&&(c*=1.65),this.crouched&&(c*=.55),this.aiming&&(c*=.55),this.suppressing&&(c*=.5);const l=c*e/o;qa(this.position,r*l,a*l,this.obstacles,.6,xe)}else this.sprinting=!1}tryFireAt(t,e){return!this.alive||this.fireCooldown>0||this.reloading>0?!1:this.mag<=0?(this.reserve>0?this.startReload():this.dryCd<=0&&(De.dry(),this.dryCd=.35),!1):(e.fire(this.muzzleWorldPosition(),this._aimDir(t),"player",this.cls.damage),this.mag--,this.fireCooldown=this.fireInterval(),this.mag===0&&this.reserve>0&&this.startReload(),!0)}_controlAI(t,e){let n=this.order===Ee.ATTACK&&this._targetAlive()?this.target:this._nearestEnemy(e.enemies,this.cls.range);n&&!e.free&&n.pos.distanceTo(this.position)>12&&(n=null);let s=null;if(this.order===Ee.FOLLOW?s=e.formationSlot:this.order===Ee.MOVE?s=this.orderPoint:this.order===Ee.ATTACK&&this._targetAlive()&&(s=this.target.pos),s){this._t.subVectors(s,this.position),this._t.y=0;const r=this._t.length(),a=this.order===Ee.ATTACK?this.cls.range*.65:.5;if(this.order===Ee.MOVE&&r<.7&&(this.order=Ee.HOLD),r>a){let o=this.cls.speed;this.order===Ee.FOLLOW&&r>12&&(o*=1.5);const c=yi(this.nav,this,this.position,s,o,t,this.obstacles,.6,xe);!n&&c&&(this.yaw=Math.atan2(c.x,c.z))}}if(this.order===Ee.ATTACK&&!this._targetAlive()&&(this.order=Ee.FOLLOW,this.target=null),n&&(this._t.subVectors(n.pos,this.position),this._t.y=0,this.yaw=Math.atan2(this._t.x,this._t.z),Ai(this.position,n.pos,this.obstacles,1.45,1.1)&&this.fireCooldown<=0)){const a=n.pos.clone();a.y=1.1,e.bullets.fire(this.muzzleWorldPosition(),this._aimDir(a,qm),"player",this.cls.damage),this.fireCooldown=this.cls.fireInterval*Xm}}_targetAlive(){return this.target&&this.target.hp>0}_nearestEnemy(t,e){let n=null,s=e;for(const r of t){const a=r.pos.distanceTo(this.position);a<s&&(s=a,n=r)}return n}_aimDir(t,e=1){const n=this._t.copy(t).sub(this.muzzleWorldPosition()).normalize(),s=this.spread()*e;return n.x+=(Math.random()-.5)*s,n.y+=(Math.random()-.5)*s,n.z+=(Math.random()-.5)*s,n.normalize().clone()}takeDamage(t,e){this.alive&&(e&&(this.lastHitFrom.set(e.x,0,e.z),this.lastHitAt=performance.now()),this.health=Math.max(0,this.health-t),this.health===0&&this._die())}heal(t){this.alive&&(this.health=Math.min(this.maxHealth,this.health+t))}_die(){this.alive=!1,this.downed=!0,this.figure.rotation.z=Math.PI/2,this.figure.position.y=.3}revive(t){this.alive=!0,this.downed=!1,this.crashDowned=!1,this.health=Math.round(this.maxHealth*t),this.figure.rotation.z=0,this.figure.position.y=0}}const Km={leader:{key:"leader",name:"LEADER",hp:100,speed:10.4,fireInterval:.14,damage:16,range:60,spread:.04,rifleLength:.9,bulky:!1,mag:24,reserve:96,reload:1.6,marking:"leader",ringColor:8257405,ability:{key:"grenade",name:"FRAG OUT",input:"press",cooldown:3.5}},heavy:{key:"heavy",name:"HEAVY",hp:150,speed:7.5,fireInterval:.07,damage:11,range:48,spread:.1,rifleLength:1.15,bulky:!0,mag:50,reserve:150,reload:2.4,marking:"none",ringColor:16764500,ability:{key:"suppress",name:"DIG IN",input:"toggle"}},sniper:{key:"sniper",name:"SNIPER",hp:75,speed:9.2,fireInterval:1,damage:90,range:125,spread:.004,rifleLength:1.6,bulky:!1,mag:5,reserve:25,reload:2.2,marking:"none",ringColor:7327999,ability:{key:"scope",name:"SCOPE",input:"aim"}},medic:{key:"medic",name:"MEDIC",hp:90,speed:11,fireInterval:.18,damage:13,range:43,spread:.05,rifleLength:.7,bulky:!1,mag:20,reserve:80,reload:1.5,marking:"cross",ringColor:16747146,ability:{key:"revive",name:"REVIVE",input:"press",cooldown:.4}}},$m=["leader","heavy","sniper","medic"],Zm=[{x:-3,z:-1.4},{x:3,z:-1.4},{x:-5.4,z:-3}],jm=4,Jm=7;class Qm{constructor(t,e,n){this.nav=n,this.members=$m.map((s,r)=>{const a=new Ym(t,Km[s],e,n),o=n.nearestOpen((2.5+r*2.7)*be,(-8-r%2*2.6)*be);return a.position.set(o.x,0,o.z),a.yaw=Math.PI/2,a.figure.position.copy(a.position),a.order=Ee.FOLLOW,a}),this.activeIndex=0,this.ring=new Ft(new Wa(.7,.95,28),new Qe({color:8257405,side:Ze,transparent:!0,opacity:.9})),this.ring.rotation.x=-Math.PI/2,t.add(this.ring),this._slot=new R,this._threat=new R}resupply(t,e){for(const n of this.members)n.alive&&(n.reserve=Math.min(n.cls.reserve,n.reserve+Math.round(n.cls.reserve*t)),n.heal(e))}get active(){return this.members[this.activeIndex]}get alive(){return this.members.some(t=>t.alive)}setActive(t){if(t<0||t>=this.members.length||!this.members[t].alive)return;const e=this.active;e.aiming=!1,e.zoomed=!1,e.suppressing=!1,this.activeIndex=t,this.ring.material.color.setHex(this.active.cls.ringColor)}cycle(){for(let t=1;t<=this.members.length;t++){const e=(this.activeIndex+t)%this.members.length;if(this.members[e].alive){this.setActive(e);return}}}orderMove(t){const e=[[0,0],[1.8,1.1],[-1.8,1.1]];let n=0;this._eachOther(s=>{const r=e[n++%e.length],a=this.nav.nearestOpen(t.x+r[0],t.z+r[1]);s.order=Ee.MOVE,s.orderPoint.set(a.x,0,a.z),s.target=null})}orderAttack(t){this._eachOther(e=>{e.order=Ee.ATTACK,e.target=t})}orderHold(){this._eachOther(t=>{t.order=Ee.HOLD,t.target=null})}orderFollow(){this._eachOther(t=>{t.order=Ee.FOLLOW,t.target=null})}_eachOther(t){for(let e=0;e<this.members.length;e++)e===this.activeIndex||!this.members[e].alive||t(this.members[e])}update(t,e){const n=this.active,s=this._worldSlots(n);let r=0;for(let a=0;a<this.members.length;a++){const o=this.members[a],c=a===this.activeIndex;o.update(t,{isActive:c,input:e.input,enemies:e.enemies,bullets:e.bullets,free:e.free,formationSlot:c?null:s[r++%s.length]})}this._medicHeal(t),n.alive||this.cycle(),this.ring.position.set(this.active.position.x,.07,this.active.position.z),this.ring.visible=this.active.alive}_worldSlots(t){const e=Math.cos(t.yaw),n=Math.sin(t.yaw);return Zm.map(s=>{const r=s.x*e+s.z*n,a=-s.x*n+s.z*e,o=this.nav.nearestOpen(t.position.x+r,t.position.z+a);return this._slot.clone().set(o.x,0,o.z)})}reviveNear(t,e=5){let n=null,s=e;for(const r of this.members){if(r===t||!r.downed)continue;const a=r.position.distanceTo(t.position);a<s&&(s=a,n=r)}return n?(n.revive(.5),n):null}takeBulletHits(t){for(let e=t.active.length-1;e>=0;e--){const n=t.active[e];if(n.team==="enemy")for(const s of this.members){if(!s.alive)continue;const r=n.mesh.position.x-s.position.x,a=n.mesh.position.y-(s.position.y+(s.crouched?.75:1.1)),o=n.mesh.position.z-s.position.z;if(r*r+a*a+o*o<.9*.9){this._threat.set(s.position.x-n.dir.x*12,0,s.position.z-n.dir.z*12),s.takeDamage(n.damage,this._threat),t.retireBullet(n);break}}}}_medicHeal(t){const e=this.members.find(n=>n.cls.key==="medic"&&n.alive);if(e)for(const n of this.members)n===e||!n.alive||n.position.distanceTo(e.position)<Jm&&n.heal(jm*t)}}const tg=85,eg=1.6,ng=new zn(.11,6,6),cc=new Qe({color:16772778}),ig=new Qe({color:16738869}),sg=new zn(.07,4,4),rg=new Qe({color:16762474});class ag{constructor(t,e){this.scene=t,this.obstacles=e,this.active=[],this.pool=[],this.sparks=[],this.onFire=null}burst(t){for(let e=0;e<5;e++){const n=new Ft(sg,rg);n.position.copy(t),this.scene.add(n),this.sparks.push({m:n,vx:(Math.random()-.5)*14,vy:4+Math.random()*8,vz:(Math.random()-.5)*14,life:.22+Math.random()*.1})}}fire(t,e,n="player",s=15){const r=this.pool.pop()||new Ft(ng,cc);r.material=n==="enemy"?ig:cc,r.position.copy(t),r.scale.set(1,1,14),r.lookAt(t.x+e.x,t.y+e.y,t.z+e.z),this.scene.add(r),this.onFire&&this.onFire(t,n),this.active.push({mesh:r,vel:e.clone().multiplyScalar(tg),dir:e.clone(),life:eg,team:n,damage:s})}update(t){for(let e=this.sparks.length-1;e>=0;e--){const n=this.sparks[e];if(n.life-=t,n.life<=0){this.scene.remove(n.m),this.sparks.splice(e,1);continue}n.vy-=30*t,n.m.position.x+=n.vx*t,n.m.position.y+=n.vy*t,n.m.position.z+=n.vz*t}for(let e=this.active.length-1;e>=0;e--){const n=this.active[e],s=n.mesh.position,r=s.x,a=s.z;s.addScaledVector(n.vel,t),n.life-=t;let o=n.life<=0||s.y<0||s.x<xe.minX-8||s.x>xe.maxX+8||s.z<xe.minZ-8||s.z>xe.maxZ+8;if(!o){for(const c of this.obstacles)if(s.y<=c.max.y&&ol(r,a,s.x,s.z,c.min.x,c.min.z,c.max.x,c.max.z)){o=!0,this.burst(s);break}}o&&this._retire(e)}}_retire(t){const e=this.active[t];this.scene.remove(e.mesh),this.pool.push(e.mesh),this.active.splice(t,1)}retireBullet(t){const e=this.active.indexOf(t);e!==-1&&this._retire(e)}}const og={rifle:{hp:40,speed:5.8,damage:13,fireInterval:.8,spread:.07,fig:{}},scout:{hp:25,speed:8.6,damage:8,fireInterval:1,spread:.09,runner:!0,fig:{rifleLength:.45}},gunner:{hp:70,speed:4.2,damage:9,fireInterval:.09,spread:.12,burst:4,burstPause:1.5,fig:{bulky:!0,rifleLength:1.3}}},lc=38,Ur=18,cg=30,lg=2.5,hc=.95,uc=1.1,hg=2,ug=20,fg=1.5,fc=29,dg=.2,pg=43,mg=21,gg=33,_g=11,vg=1.1,xg=.5,dc=3,Mg=4;function hl(i,t){const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d");return n.font="bold 52px monospace",n.textAlign="center",n.textBaseline="middle",n.lineWidth=8,n.strokeStyle="rgba(0,0,0,0.85)",n.strokeText(i,32,34),n.fillStyle=t,n.fillText(i,32,34),new il({map:new rl(e),depthTest:!1})}const Nr=hl("?","#ffd23d"),Sg=hl("!","#ff4030");class yg{constructor(t,e,n,s){this.scene=t,this.obstacles=e,this.coverPoints=n,this.nav=s,this.list=[],this.dying=[],this.kills=0,this.combatStarted=!1,this.firstSpotted=!1,this.hitFlash=0,this.radio=null,this.reserveLayout=null,this.alarmRaised=!1,this._v=new R,this._g=new R}spawnLayout(t){for(const e of t){const n=og[e.type||"rifle"],s=ll(12757098,n.fig),r=this.nav.nearestOpen(e.x,e.z),a=new R(r.x,0,r.z);s.position.copy(a),s.rotation.y=e.facing,this.scene.add(s);const o=new Cm(Nr);o.scale.set(1.5,1.5,1),o.position.set(0,3.1,0),o.visible=!1,s.add(o),this.list.push({fig:s,pos:a,tell:o,type:e.type||"rifle",hp:n.hp,speed:n.speed,damage:n.damage,fireInterval:n.fireInterval,spread:n.spread,burst:n.burst||0,burstPause:n.burstPause||0,burstLeft:n.burst||0,runner:!!n.runner,fireCd:Math.random()*.5,recheck:0,cover:null,suppressed:0,stagger:0,alerted:!1,aware:0,alertFlash:0,alertedFor:0,callT:0,facing:e.facing,home:{x:r.x,z:r.z,facing:e.facing},lastKnown:new R,hasIntel:!1,searching:!1,searchT:0,patrol:e.patrol?{a:{x:r.x,z:r.z},b:{...e.patrol},toB:!0}:null})}}raiseAlarm(t){if(this.alarmRaised||(this.alarmRaised=!0,De.alarm(),!this.reserveLayout))return;const e=this.list.length;this.spawnLayout(this.reserveLayout);const n=t&&t.active.alive?t.active.position:null;for(let s=e;s<this.list.length;s++)this.alert(this.list[s],n),this.list[s].alertFlash=0}alert(t,e){if(e&&(t.lastKnown.set(e.x,0,e.z),t.hasIntel=!0,t.searchT=0),!t.alerted){t.alerted=!0,t.alertFlash=2.2,this.firstSpotted=!0,this.combatStarted=!0;for(const n of this.list)!n.alerted&&Math.hypot(n.pos.x-t.pos.x,n.pos.z-t.pos.z)<_g&&this.alert(n,t.hasIntel?t.lastKnown:null)}}hearGunshot(t){this.combatStarted=!0;for(const e of this.list)Math.hypot(e.pos.x-t.x,e.pos.z-t.z)<mg&&this.alert(e,t)}takedown(t,e){const n=this.list.indexOf(t);if(n===-1)return!1;const s=t.pos.x-e.x,r=t.pos.z-e.z,a=Math.hypot(s,r)||1;return this.dying.push({fig:t.fig,t:0,dx:s/a,dz:r/a,tip:Math.random()<.5?1:-1}),t.fig.remove(t.tell),this.list.splice(n,1),this.kills++,this.hearScuffle(t.pos),!0}hearScuffle(t){for(const e of this.list)Math.hypot(e.pos.x-t.x,e.pos.z-t.z)<8&&this.alert(e,t)}hearBlast(t){this.combatStarted=!0;for(const e of this.list){const n=Math.hypot(e.pos.x-t.x,e.pos.z-t.z);n<gg&&this.alert(e,t),n<10&&(e.suppressed=Math.max(e.suppressed,1))}}applySuppression(t,e,n){for(const s of this.list){const r=s.pos.x-t.x,a=s.pos.z-t.z;r*r+a*a<e*e&&(s.alerted||this.alert(s,t),s.suppressed=Math.max(s.suppressed,n),s.recheck=Math.min(s.recheck,.2))}}update(t,e,n){this.hitFlash=Math.max(0,this.hitFlash-t);for(let s=this.dying.length-1;s>=0;s--){const r=this.dying[s];r.t+=t,r.t<.45?(r.fig.position.x+=r.dx*t*9,r.fig.position.z+=r.dz*t*9,r.fig.position.y=Math.sin(Math.min(1,r.t/.45)*Math.PI)*1.2,r.fig.rotation.z=r.t/.45*(Math.PI/2)*r.tip):(r.fig.rotation.z=Math.PI/2*r.tip,r.fig.position.y=.3,this.dying.splice(s,1))}for(let s=this.list.length-1;s>=0;s--){const r=this.list[s];for(const a of n.active){if(a.team!=="player")continue;const o=a.mesh.position.x-r.pos.x,c=a.mesh.position.y-uc,l=a.mesh.position.z-r.pos.z;if(o*o+c*c+l*l<hc*hc){r.hp-=a.damage,r.stagger=.35,this.hitFlash=.12;const h=this._nearestSoldier(e,r.pos);this.alert(r,h?h.position:null);const f=a.dir||this._v.set(0,0,0);qa(r.pos,f.x*.5,f.z*.5,this.obstacles,.6,xe),r.fig.position.copy(r.pos),n.burst(a.mesh.position),n.retireBullet(a);break}}if(r.hp<=0){const a=this._v.subVectors(r.pos,this._nearestSoldier(e,r.pos)?.position||r.pos),o=Math.hypot(a.x,a.z)||1;this.dying.push({fig:r.fig,t:0,dx:a.x/o,dz:a.z/o,tip:Math.random()<.5?1:-1}),r.fig.remove(r.tell),this.list.splice(s,1),this.kills++;continue}if(r.suppressed=Math.max(0,r.suppressed-t),r.stagger=Math.max(0,r.stagger-t),r.alertFlash=Math.max(0,r.alertFlash-t),r.alerted?(r.alertedFor+=t,this._fight(r,t,e,n)):(r.alertedFor=0,this._sentry(r,t,e)),!r.alerted&&r.aware>.06){r.tell.visible=!0,r.tell.material=Nr;const a=1+r.aware*1.4;r.tell.scale.set(a,a,1),r.tell.material.opacity=.45+.55*r.aware}else r.alerted&&r.alertFlash>0?(r.tell.visible=!0,r.tell.material=Sg,r.tell.scale.set(2.1,2.1,1)):r.alerted&&r.searching?(r.tell.visible=!0,r.tell.material=Nr,r.tell.scale.set(1.7,1.7,1),r.tell.material.opacity=.9):r.tell.visible=!1}}_sentry(t,e,n){if(t.patrol){const c=t.patrol.toB?t.patrol.b:t.patrol.a;if(Math.hypot(c.x-t.pos.x,c.z-t.pos.z)<.8)t.patrol.toB=!t.patrol.toB;else{const l=yi(this.nav,t,t.pos,c,dc,e,this.obstacles,.6,xe);t.fig.position.copy(t.pos),l&&(t.facing=Math.atan2(l.x,l.z),t.fig.rotation.y=t.facing)}}else if(Math.hypot(t.home.x-t.pos.x,t.home.z-t.pos.z)>1.2){const c=yi(this.nav,t,t.pos,t.home,dc,e,this.obstacles,.6,xe);t.fig.position.copy(t.pos),c&&(t.facing=Math.atan2(c.x,c.z),t.fig.rotation.y=t.facing)}else Math.abs(t.facing-t.home.facing)>.01&&t.aware<.05&&(t.facing=t.home.facing,t.fig.rotation.y=t.facing);let s=null,r=fc;const a=Math.sin(t.facing),o=Math.cos(t.facing);for(const c of n.members){if(!c.alive)continue;const l=c.position.x-t.pos.x,h=c.position.z-t.pos.z,f=Math.hypot(l,h);f>=r||(a*l+o*h)/(f||1)<dg||Ai(t.pos,c.position,this.obstacles,1.5,c.crouched?.8:1.25)&&(s=c,r=f)}if(s){let c=vg*(1.2-r/fc);s.crouched&&(c*=.5),s.sprinting&&(c*=1.8),t.aware+=e*Math.max(.15,c),t.aware>=1&&this.alert(t,s.position)}else t.aware=Math.max(0,t.aware-e*xg)}_fight(t,e,n,s){let r=null,a=pg;for(const h of n.members){if(!h.alive)continue;const f=t.pos.distanceTo(h.position);f>=a||Ai(t.pos,h.position,this.obstacles,1.5,h.crouched?.75:1.1)&&(r=h,a=f)}const o=this.radio;if(o&&o.alive&&!this.alarmRaised&&t.runner&&!(r&&a<9)){if(Math.hypot(o.pos.x-t.pos.x,o.pos.z-t.pos.z)>2.2){t.callT=0;const p=yi(this.nav,t,t.pos,o.pos,t.speed*1.1,e,this.obstacles,.6,xe);t.fig.position.copy(t.pos),p&&(t.facing=Math.atan2(p.x,p.z))}else t.callT+=e,t.facing=Math.atan2(o.pos.x-t.pos.x,o.pos.z-t.pos.z),t.callT>fg&&this.raiseAlarm(n);t.searching=!1,t.fig.rotation.y=t.facing;return}if(!r){t.cover=null;let h=!0;if(t.hasIntel&&Math.hypot(t.lastKnown.x-t.pos.x,t.lastKnown.z-t.pos.z)>2.2){const f=yi(this.nav,t,t.pos,t.lastKnown,t.speed*.8,e,this.obstacles,.6,xe);t.fig.position.copy(t.pos),f&&(h=!1,t.searching=!1,t.facing=Math.atan2(f.x,f.z))}h&&(t.searching=!0,t.facing+=e*1.4,t.searchT+=e,t.searchT>Mg&&(t.alerted=!1,t.searching=!1,t.searchT=0,t.hasIntel=!1,t.aware=.5,t._navPath=null)),t.fig.rotation.y=t.facing;return}t.searching=!1,t.searchT=0,t.hasIntel=!0,t.lastKnown.set(r.position.x,0,r.position.z),this._v.subVectors(r.position,t.pos),this._v.y=0;const c=this._v.length();t.recheck-=e,(t.recheck<=0||!t.cover)&&(t.cover=this._findCover(t,r),t.recheck=lg),t.cover&&!Ai(t.cover,r.position,this.obstacles)&&(t.cover=null);let l=null;if(t.cover)l=t.cover;else if(c>Ur+2){const h=Ur/c;this._g.set(r.position.x-this._v.x*h,0,r.position.z-this._v.z*h),l=this._g}if(l&&(this._g.subVectors(l,t.pos),this._g.y=0,this._g.length()>.5&&(yi(this.nav,t,t.pos,l,t.speed,e,this.obstacles,.6,xe),t.fig.position.copy(t.pos))),t.facing=Math.atan2(this._v.x,this._v.z),t.fig.rotation.y=t.facing,t.fireCd-=e,c<lc*.9&&t.fireCd<=0&&t.suppressed<=0&&t.stagger<=0){const h=t.fig.localToWorld(t.fig.userData.muzzleOffset.clone()),f=r.crouched?.75:uc,p=new R(r.position.x,f,r.position.z).sub(h).normalize();p.x+=(Math.random()-.5)*t.spread,p.y+=(Math.random()-.5)*t.spread,p.z+=(Math.random()-.5)*t.spread,s.fire(h,p.normalize(),"enemy",t.damage),t.burst?(t.burstLeft--,t.fireCd=t.burstLeft>0?t.fireInterval:(t.burstLeft=t.burst,t.burstPause)):t.fireCd=t.fireInterval,this.combatStarted=!0}c<hg&&r.takeDamage(ug*e,t.pos)}_nearestSoldier(t,e){let n=null,s=1/0;for(const r of t.members){if(!r.alive)continue;const a=r.position.distanceTo(e);a<s&&(s=a,n=r)}return n}_findCover(t,e){let n=null,s=1/0;for(const r of this.coverPoints){if(r.distanceTo(t.pos)>cg)continue;const a=r.distanceTo(e.position);if(a>lc||!Ai(r,e.position,this.obstacles))continue;const o=r.distanceTo(t.pos)+Math.abs(a-Ur)*.5;o<s&&(s=o,n=r)}return n?n.clone():null}}const pc=32,Eg=26,Tg=2.2,Fr=8.5,Ag=130,bg=new zn(.22,8,8),wg=new he({color:3095076,roughness:.7}),Rg=new zn(1,16,12);class Cg{constructor(t,e){this.scene=t,this.obstacles=e,this.nades=[],this.flashes=[]}throwAt(t,e){const n=e.x-t.x,s=e.z-t.z,r=Math.hypot(n,s)||.001,a=Math.max(.5,r/Eg),o=(0-t.y+.5*pc*a*a)/a,c=new Ft(bg,wg);c.castShadow=!0,c.position.copy(t),this.scene.add(c),this.nades.push({mesh:c,vel:new R(n/a,o,s/a),fuse:Tg})}update(t,e){for(let n=this.nades.length-1;n>=0;n--){const s=this.nades[n];s.vel.y-=pc*t;const r=s.mesh.position,a=r.x,o=r.z;r.addScaledVector(s.vel,t),s.fuse-=t;let c=s.fuse<=0||r.y<=.2||r.x<xe.minX||r.x>xe.maxX||r.z<xe.minZ||r.z>xe.maxZ;if(!c){for(const l of this.obstacles)if(r.y<=l.max.y&&ol(a,o,r.x,r.z,l.min.x,l.min.z,l.max.x,l.max.z)){c=!0;break}}c&&(this._explode(r.clone(),e),this.scene.remove(s.mesh),this.nades.splice(n,1))}for(let n=this.flashes.length-1;n>=0;n--){const s=this.flashes[n];s.life-=t;const r=1-s.life/s.max;s.mesh.scale.setScalar(.5+r*Fr),s.mesh.material.opacity=Math.max(0,1-r),s.life<=0&&(this.scene.remove(s.mesh),this.flashes.splice(n,1))}}_explode(t,e){for(const s of e.list){const r=s.pos.distanceTo(t);r<Fr&&(s.hp-=Ag*(1-r/Fr))}e.hearBlast(t);const n=new Ft(Rg,new Qe({color:16755251,transparent:!0,opacity:.9}));n.position.set(t.x,.6,t.z),this.scene.add(n),this.flashes.push({mesh:n,life:.45,max:.45})}}const ul=[];let fl;const Pg={follow:"FOLLOW",hold:"HOLDING",move:"MOVING",attack:"ATTACK"};function Lg(i){const t=document.getElementById("squad");fl=document.getElementById("kills"),i.members.forEach((e,n)=>{const s=document.createElement("div");s.className="card",s.style.setProperty("--ring","#"+e.cls.ringColor.toString(16).padStart(6,"0")),s.innerHTML=`
      <div class="card-top"><span class="key">${n+1}</span><span class="name">${e.cls.name}</span></div>
      <div class="bar"><div class="fill"></div></div>
      <div class="order"></div>`,t.appendChild(s),ul.push({root:s,fill:s.querySelector(".fill"),order:s.querySelector(".order")})})}function Dg(i,t){i.members.forEach((e,n)=>{const s=ul[n],r=Math.max(0,e.health/e.maxHealth*100);s.fill.style.width=r+"%",s.root.classList.toggle("active",n===i.activeIndex&&e.alive),s.root.classList.toggle("dead",!e.alive),s.order.textContent=e.alive?n===i.activeIndex?"YOU":Pg[e.order]||"":"DOWN"}),fl.textContent=t}const gn=[{id:"crash-site",name:"CRASH SITE",sector:"THE HOUSE — LIVING ROOM, DUSK",briefing:"We came down hard through the window and the squad got thrown across the room. You are ALONE at the wreck — Heavy, Sniper and Medic are lying out there between the furniture, and the tan found the crash before you woke up. Get your men on their feet. Recover the supply drops. Their field radio is in the STUDY: while it lives, any tan who marks you will run to call the porch reserve down on your head. Cut it. Then breach the front door and get out.",winText:"ESCAPED THE HOUSE — ONTO THE PORCH",scatter:[{member:1,x:16,z:-32},{member:3,x:24,z:12},{member:2,x:52,z:14}],stages:[{type:"regroup",text:"FIND YOUR SQUAD",toast:"YOUR SQUAD IS OUT THERE — get them on their feet"},{type:"multi",toast:"RECOVER THE SUPPLY DROPS — and CUT THAT RADIO",parts:[{type:"collect",text:"SUPPLIES",items:[{x:89.5,z:-8},{x:132,z:-36},{x:126,z:13}]},{type:"destroy",text:"CUT THE ALARM"}]},{type:"escape",holdSeconds:4,toast:"BREACH THE FRONT DOOR — hold the doormat"}],enemyLayout:[{x:12,z:-26,facing:2.55},{x:21,z:-29,facing:-2.11},{x:24.5,z:-4,facing:.05},{x:32.5,z:9.5,facing:-1.29},{x:49,z:20,facing:2.68},{x:38,z:22,facing:-2.3},{x:45.5,z:-16.5,facing:-1.8},{x:69.5,z:18,facing:-Math.PI/2},{x:53,z:-27,facing:-Math.PI/2,type:"scout",patrol:{x:23,z:-22}},{x:60,z:6,facing:2,type:"scout",patrol:{x:46,z:26}},{x:33,z:-36,facing:1.6,type:"scout",patrol:{x:62,z:-33}},{x:85,z:-13,facing:-1.2},{x:84.5,z:30,facing:Math.PI,type:"scout",patrol:{x:84.5,z:-36}},{x:90,z:-2,facing:3.1},{x:123,z:-27,facing:-Math.PI/2,type:"gunner"},{x:108,z:-35,facing:-1},{x:136,z:-30,facing:-2.55},{x:131,z:25,facing:-1.57,type:"gunner"},{x:122,z:26,facing:-Math.PI/2},{x:105,z:38,facing:2.6},{x:118,z:40,facing:-2.4,type:"scout",patrol:{x:98,z:24}},{x:80,z:39,facing:Math.PI,type:"gunner"},{x:89,z:39.5,facing:Math.PI,type:"gunner"},{x:84.5,z:43.5,facing:Math.PI},{x:78,z:43,facing:2.6},{x:91,z:43,facing:-2.6}],reserve:[{x:82,z:44,facing:Math.PI},{x:87,z:44,facing:Math.PI},{x:84.5,z:42,facing:Math.PI},{x:80.5,z:42.5,facing:2.8}]},{id:"hallway",name:"OUT THE DOOR",sector:"THE PORCH — NIGHT",briefing:"Coming soon.",comingSoon:!0},{id:"street",name:"THE STREET",sector:"OUTSIDE — NIGHT",briefing:"Coming soon.",comingSoon:!0}];for(const i of gn){if(i.scatter)for(const t of i.scatter)t.x*=be,t.z*=be;if(i.enemyLayout)for(const t of i.enemyLayout)t.x*=be,t.z*=be,t.patrol&&(t.patrol.x*=be,t.patrol.z*=be);if(i.reserve)for(const t of i.reserve)t.x*=be,t.z*=be;if(i.stages){for(const t of i.stages)if(t.parts)for(const e of t.parts){if(e.items)for(const n of e.items)n.x*=be,n.z*=be;e.at&&(e.at.x*=be,e.at.z*=be)}}}function Ig(i){return gn.find(t=>t.id===i)||null}const Ug=3,Ng=1.8,Fg=2.4,Og=2.2,mc=1.5,zg=.5,Bg=20;class Hg{constructor(t,e,n){this.def=t,this.scene=e,this.world=n,this.state="active",this.stageIdx=0,this.timeAcc=0,this.t=0,this.startKills=0,this.rescueT=new Map,this.smashT=0,this.squad=null,this.onToast=null}begin(t,e){if(this.squad=e,this.startKills=t.kills,this.def.enemyLayout&&t.spawnLayout(this.def.enemyLayout),t.radio=this.world.radio||null,t.reserveLayout=this.def.reserve||null,this.def.scatter)for(const n of this.def.scatter){const s=e.members[n.member];s.position.set(n.x,0,n.z),s.alive=!1,s.downed=!0,s.crashDowned=!0,s.health=0,s.figure.position.copy(s.position),s.figure.position.y=.3,s.figure.rotation.z=Math.PI/2}this.stage()&&this.onToast&&this.onToast(this.stage().toast||"")}stage(){return this.def.stages[this.stageIdx]}killCount(t){return t.kills-this.startKills}_advance(){this.stageIdx++,De.objective(),this.stageIdx>=this.def.stages.length?this.state="won":this.onToast&&this.onToast(this.stage().toast||"")}update(t,e,n,s){if(this.state!=="active")return;this.t+=t,this._animateProps();const r=this.stage();if(r.type==="regroup")this._regroup(t,e)&&this._advance();else if(r.type==="multi"){let a=!0;for(const o of r.parts)o.type==="collect"&&!this._collect(e)&&(a=!1),o.type==="destroy"&&!this._destroy(t,e,s)&&(a=!1);a&&this._advance()}else r.type==="escape"&&this._escape(t,r,e,n);e.alive||(this.state="lost")}_regroup(t,e){let n=0;for(const s of e.members){if(!s.crashDowned)continue;n++;let r=!1;for(const o of e.members)if(o.alive&&o.position.distanceTo(s.position)<Ug){r=!0;break}const a=this.rescueT.get(s)||0;r?(this.rescueT.set(s,a+t),a+t>=Ng&&(s.revive(.6),De.pickup(),n--)):a>0&&this.rescueT.set(s,Math.max(0,a-t*2))}return n===0}_collect(t){let e=!0;for(const n of this.world.supplies){if(n.taken)continue;let s=!1;for(const r of t.members)if(r.alive&&Math.hypot(r.position.x-n.x,r.position.z-n.z)<Fg){s=!0;break}s?(n.taken=!0,n.crate.visible=!1,n.ring.visible=!1,t.resupply(zg,Bg),De.pickup()):e=!1}return e}_destroy(t,e,n){const s=this.world.radio;if(!s||!s.alive)return!0;for(let a=n.active.length-1;a>=0;a--){const o=n.active[a];if(o.team!=="player")continue;const c=o.mesh.position.x-s.pos.x,l=o.mesh.position.y-.7,h=o.mesh.position.z-s.pos.z;c*c+l*l+h*h<1.2*1.2&&(s.hp-=o.damage,n.burst(o.mesh.position),n.retireBullet(o))}let r=!1;for(const a of e.members)if(a.alive&&Math.hypot(a.position.x-s.pos.x,a.position.z-s.pos.z)<Og){r=!0;break}return this.smashT=r?this.smashT+t:Math.max(0,this.smashT-t*2),s.hp<=0||this.smashT>=mc?(s.alive=!1,s.lamp.visible=!1,s.group.rotation.z=1.1,s.group.position.y=.35,De.kill(),!0):!1}_escape(t,e,n,s){const r=this.world.exit;let a=!1,o=!1;for(const c of n.members)c.alive&&Math.hypot(c.position.x-r.x,c.position.z-r.z)<r.r&&(a=!0);for(const c of s.list)if(Math.hypot(c.pos.x-r.x,c.pos.z-r.z)<r.r+9){o=!0;break}this.timeAcc=a&&!o?this.timeAcc+t:Math.max(0,this.timeAcc-t*.6),this.timeAcc>=e.holdSeconds&&(this.state="won")}_animateProps(){this.world.supplies&&this.world.supplies.forEach((e,n)=>{e.taken||(e.crate.position.y=.8+Math.sin(this.t*2.5+n*2)*.18,e.crate.rotation.y=this.t*.6+n,e.ring.material.opacity=.22+.14*Math.sin(this.t*3+n))});const t=this.world.radio;t&&t.alive&&(t.lamp.visible=Math.sin(this.t*6)>-.2)}statusText(t){const e=this.stage();if(!e)return"";const n=t.firstSpotted?"":"   ·   UNDETECTED";if(e.type==="regroup"){const s=this.def.scatter.length,r=this.squad?this.squad.members.filter(a=>a.crashDowned).length:s;return`FIND YOUR SQUAD   ${s-r} / ${s}${n}`}if(e.type==="multi"){const s=[];for(const r of e.parts)if(r.type==="collect"){const a=this.world.supplies.filter(o=>o.taken).length;s.push(`SUPPLIES ${a} / ${this.world.supplies.length}`)}else r.type==="destroy"&&(this.world.radio.alive?this.smashT>.15?s.push(`CUTTING THE ALARM ${Math.min(100,Math.round(this.smashT/mc*100))}%`):s.push("CUT THE ALARM"):s.push("ALARM CUT ✓"));return s.join("   ·   ")+n}return e.type==="escape"?this.timeAcc>.05?`BREACHING THE FRONT DOOR   ${this.timeAcc.toFixed(1)} / ${e.holdSeconds}s`:`ESCAPE — reach the front door   (tan: ${t.list.length})`:""}}const Xe=new bm({antialias:!0});Xe.setSize(window.innerWidth,window.innerHeight);Xe.setPixelRatio(Math.min(window.devicePixelRatio,2));Xe.shadowMap.enabled=!0;Xe.shadowMap.type=Tc;Xe.toneMapping=bc;Xe.toneMappingExposure=1.3;Xe.outputColorSpace=ke;document.body.appendChild(Xe.domElement);const we=new ze(70,window.innerWidth/window.innerHeight,.1,500),Ra=7,gc=2.2,{scene:Bn,obstacles:Bi,coverPoints:kg,exit:Gg,exitGlow:Vg,nav:dl,supplies:Wg,radio:Xg}=km(),_c={exit:Gg,supplies:Wg,radio:Xg},re=new Gm(Xe.domElement),It=new Qm(Bn,Bi,dl),bn=new ag(Bn,Bi),ue=new yg(Bn,Bi,kg,dl),Ya=new Cg(Bn,Bi);Lg(It);bn.onFire=(i,t)=>{const e=i.distanceTo(It.active.position);De.gunshot(t==="player"?Math.min(e,4):e),ue.hearGunshot(i)};window.game={scene:Bn,camera:we,squad:It,bullets:bn,enemies:ue,grenades:Ya,input:re};let Fn="menu",Cn=null,In=null;const Qt=i=>document.getElementById(i),pl=Qt("menu"),ml=Qt("start"),gl=Qt("win"),_l=Qt("gameover"),Ka=Qt("objective"),Ca=Qt("crosshair"),Fs=Qt("vignette"),Or=Qt("ability"),qg=Qt("scope"),Mi=Qt("ammo"),zr=Qt("dmgdir"),Yg=Qt("takedown"),vl=()=>parseInt(localStorage.getItem("ts_unlocked")||"1",10),$s=i=>localStorage.setItem("ts_screen",i);function $a(){for(const i of[pl,ml,gl,_l])i.classList.add("hidden")}function Ni(){Fn="menu",$s("menu"),document.pointerLockElement&&document.exitPointerLock(),$a(),Ka.classList.add("hidden"),Kg(),pl.classList.remove("hidden")}function Kg(){const i=vl(),t=Qt("missionList");t.innerHTML="",gn.forEach((e,n)=>{const s=n>=i||e.comingSoon,r=document.createElement("div");r.className="mission"+(s?" locked":""),r.innerHTML=`<div><div class="m-name">${n+1}. ${e.name}</div><div class="m-sector">${e.sector}</div></div><div class="m-tag">${s?"LOCKED":"▶ DEPLOY"}</div>`,s||r.addEventListener("click",()=>{$s("mission:"+e.id),location.reload()}),t.appendChild(r)})}function $g(i){Fn="brief",In=i,$a(),Qt("briefName").textContent=i.name,Qt("briefSector").textContent=i.sector,Qt("briefText").textContent=i.briefing,ml.classList.remove("hidden")}function Zg(){if(Fn!=="brief")return;$a(),De.resume();const i=Qt("titlecard");i&&(Qt("cardCampaign").textContent="THE LONG WAY HOME",Qt("cardMission").textContent=`Mission ${gn.findIndex(t=>t.id===In.id)+1} — ${In.name}`,i.classList.remove("hidden"),i.classList.remove("fade"),setTimeout(()=>i.classList.add("fade"),3200),setTimeout(()=>i.classList.add("hidden"),4600)),Cn=new Hg(In,Bn,_c),Cn.onToast=jg,Cn.begin(ue,It),window.game.mission=Cn,window.game.world=_c,Ka.classList.remove("hidden"),Fn="playing",re.requestLock()}let vc=null;function jg(i){const t=Qt("toast");!t||!i||(t.textContent=i,t.classList.add("show"),clearTimeout(vc),vc=setTimeout(()=>t.classList.remove("show"),3800))}function Jg(){Fn="won",De.sting(!0),document.pointerLockElement&&document.exitPointerLock();const i=gn.findIndex(e=>e.id===In.id),t=i>=gn.length-1;localStorage.setItem("ts_unlocked",Math.max(vl(),Math.min(i+2,gn.length))),Qt("winText").textContent=t?"CAMPAIGN COMPLETE — HOME AT LAST":In.winText||"OBJECTIVE COMPLETE",Qt("nextBtn").classList.toggle("hidden",t),gl.classList.remove("hidden")}function Qg(){Fn="lost",De.sting(!1),document.pointerLockElement&&document.exitPointerLock(),_l.classList.remove("hidden")}Qt("deployBtn").addEventListener("click",Zg);Qt("briefMenuBtn").addEventListener("click",Ni);Qt("winMenuBtn").addEventListener("click",Ni);Qt("loseMenuBtn").addEventListener("click",Ni);Qt("retryBtn").addEventListener("click",()=>{$s("mission:"+In.id),location.reload()});Qt("nextBtn").addEventListener("click",()=>{const i=gn.findIndex(e=>e.id===In.id),t=gn[i+1];t?($s("mission:"+t.id),location.reload()):Ni()});Xe.domElement.addEventListener("click",()=>{Fn==="playing"&&!re.locked&&re.requestLock()});(function(){const t=localStorage.getItem("ts_screen")||"menu";if(t.startsWith("mission:")){const e=Ig(t.slice(8));e?$g(e):Ni()}else Ni()})();const xc=new Nm,t_=new Dt(0,0),e_=new An(new R(0,1,0),0),Si=new R;function n_(){xc.setFromCamera(t_,we);const i=xc.ray;let t=null,e=1/0;for(const n of ue.list){const s=n.pos.x,r=1.1,a=n.pos.z,o=s-i.origin.x,c=r-i.origin.y,l=a-i.origin.z,h=o*i.direction.x+c*i.direction.y+l*i.direction.z;if(h<0||h>e)continue;const f=i.origin.x+i.direction.x*h,p=i.origin.y+i.direction.y*h,m=i.origin.z+i.direction.z*h;Math.hypot(f-s,p-r,m-a)<1.3&&(t=n,e=h)}return t?(Si.set(t.pos.x,1.1,t.pos.z),{enemy:t,point:Si}):i.intersectPlane(e_,Si)?{enemy:null,point:Si}:(i.at(80,Si),{enemy:null,point:Si})}let Rs=70,Ji=!1,Br=0,Mc=0,Sc=new R;const i_=new Um,Os=new ji(16767392,0,14);Bn.add(Os);function xl(){requestAnimationFrame(xl),Ml(Math.min(i_.getDelta(),.05))}function Ml(i){if(Fn==="playing"&&(re.locked||re.debugLock)&&It.alive){re.consume("Digit1")&&It.setActive(0),re.consume("Digit2")&&It.setActive(1),re.consume("Digit3")&&It.setActive(2),re.consume("Digit4")&&It.setActive(3),re.consume("Tab")&&It.cycle();const t=n_();Ca.classList.toggle("enemy",!!t.enemy),re.consume("KeyQ")&&(t.enemy?It.orderAttack(t.enemy):It.orderMove(t.point.clone())),re.consume("KeyF")&&It.orderFollow(),re.consume("KeyH")&&It.orderHold(),re.consume("KeyC")&&(It.active.crouched=!It.active.crouched),re.consume("KeyM")&&(Ji=!Ji),re.consume("KeyR")&&It.active.startReload(),c_(t),o_(),It.update(i,{input:re,enemies:ue.list,bullets:bn,free:ue.combatStarted}),re.firing&&!Ji&&It.active.tryFireAt(t.point,bn)&&(Os.position.copy(It.active.muzzleWorldPosition()),Os.intensity=26,It.active.pitch+=.012),Os.intensity*=Math.pow(1e-4,i),Ya.update(i,ue),bn.update(i),ue.update(i,It,bn),It.takeBulletHits(bn),Sl(i),l_(i),Dg(It,ue.kills),f_(),h_(),u_(),Ca.classList.toggle("hit",ue.hitFlash>0),Br+=It.active.position.distanceTo(Sc),Sc.copy(It.active.position);const e=It.active.crouched?1.15:1.7;Br>e&&(Br=0,De.footstep()),ue.kills>Mc&&(De.kill(),Mc=ue.kills),Vg.material.opacity=.25+.15*Math.sin(performance.now()*.004),Fs.classList.toggle("show",It.active.alive&&It.active.health<35),Cn.update(i,It,ue,bn),Ka.textContent=Cn.statusText(ue),Cn.state==="won"?Jg():Cn.state==="lost"&&Qg()}re.endFrame(),Xe.render(Bn,we)}window.game.step=(i=1,t=1/60)=>{for(let e=0;e<i;e++)Ml(t)};const s_=Bi.filter(i=>i.max.y>=3.5&&(i.max.x-i.min.x)*(i.max.z-i.min.z)>=5);let Yn=Ra,$i=0;function Sl(i=0){if(Ji){we.position.set(103,162,.01),we.lookAt(103,0,0);for(const E of ue.list){let y=E.alerted||E.aware>.05;if(!y){for(const A of It.members)if(A.alive&&A.position.distanceTo(E.pos)<52&&Ai(A.position,E.pos,Bi)){y=!0;break}}E.fig.visible=y}return}for(const E of ue.list)E.fig.visible=!0;const t=It.active;$i+=((t.aiming?1:0)-$i)*Math.min(1,i*9);const e=Ra+(3.4-Ra)*$i,n=1.05*$i,s=Math.cos(t.yaw),r=-Math.sin(t.yaw),a=t.position.y+(gc+(1.85-gc)*$i)*(t.crouched?.7:1),o=t.position.x+s*n,c=t.position.z+r*n,l=Math.cos(t.pitch),h=Math.sin(t.pitch),f=-Math.sin(t.yaw)*l,p=h,m=-Math.cos(t.yaw)*l;let _=e;const M=o+f*e,d=a+p*e,u=c+m*e;for(const E of s_){const y=cl(o,a,c,M,d,u,E);y<1/0&&(_=Math.min(_,y*e-.35))}_=Math.max(1.4,_),Yn=_<Yn?_:Yn+(_-Yn)*Math.min(1,i*5),we.position.set(o+f*Yn,a+p*Yn,c+m*Yn),we.lookAt(o,a,c);for(const E of It.members){const y=E.figure.position,A=y.x-we.position.x,U=y.y+1.4-we.position.y,w=y.z-we.position.z,b=Math.sqrt(A*A+U*U+w*w),I=Math.max(0,Math.min(1,(b-1.4)/1.2));for(const j of E.figure.userData.fadeMats)j.transparent=I<1,j.opacity=I}}const r_=3;function a_(){const i=It.active;if(!i.alive)return null;let t=null,e=r_;for(const n of ue.list){if(n.alerted&&!n.searching)continue;const s=i.position.x-n.pos.x,r=i.position.z-n.pos.z,a=Math.hypot(s,r);if(a>=e)continue;const o=Math.sin(n.facing),c=Math.cos(n.facing);(o*s+c*r)/(a||1)>-.1||(t=n,e=a)}return t}function o_(){const i=a_();Yg.classList.toggle("show",!!i),i&&re.consume("KeyE")&&(ue.takedown(i,It.active.position),De.takedown())}function c_(i){const t=It.active;if(t.zoomed=!1,!t.alive)return;t.aiming=re.aiming&&!Ji;const e=t.cls.ability;e.key==="scope"&&(t.zoomed=t.aiming),e.key==="suppress"?(re.consume("Space")&&(t.suppressing=!t.suppressing),t.suppressing&&ue.applySuppression(i.point,12,.7)):(t.suppressing=!1,re.consume("Space")&&t.abilityCd<=0&&(e.key==="grenade"?(Ya.throwAt(t.muzzleWorldPosition(),i.point),t.abilityCd=e.cooldown):e.key==="revive"&&It.reviveNear(t)&&(t.abilityCd=e.cooldown)))}function l_(i){const t=It.active,e=t.zoomed?28:t.aiming?52:t.sprinting?76:70;Rs+=(e-Rs)*Math.min(1,i*12),Math.abs(we.fov-Rs)>.01&&(we.fov=Rs,we.updateProjectionMatrix()),qg.classList.toggle("show",t.zoomed),Ca.classList.toggle("ads",t.aiming&&!t.zoomed)}function h_(){const i=It.active;i.reloading>0?(Mi.textContent="RELOADING…",Mi.classList.add("reloading"),Mi.classList.remove("low")):(Mi.textContent=`${i.mag} / ${i.reserve}`,Mi.classList.remove("reloading"),Mi.classList.toggle("low",i.mag<=Math.ceil(i.cls.mag*.25)))}let yc=0;function u_(){const i=It.active,t=performance.now()-i.lastHitAt;if(t<700){const n=Math.atan2(i.lastHitFrom.x-i.position.x,i.lastHitFrom.z-i.position.z)-i.yaw;zr.style.transform=`translate(-50%, -50%) rotate(${(-n*180/Math.PI).toFixed(1)}deg)`,zr.style.opacity=(1-t/700)*.9,i.lastHitAt!==yc&&(yc=i.lastHitAt,Fs.classList.remove("pulse"),Fs.offsetWidth,Fs.classList.add("pulse"))}else zr.style.opacity=0}function f_(){const i=It.active,t=i.cls.ability;Or.textContent=(t.input==="aim"?"RMB":"SPACE")+"  "+t.name;const e=t.key==="suppress"&&i.suppressing||t.key==="scope"&&i.zoomed;Or.classList.toggle("active",e),Or.classList.toggle("cooldown",t.input==="press"&&i.abilityCd>0)}Sl();xl();window.addEventListener("resize",()=>{we.aspect=window.innerWidth/window.innerHeight,we.updateProjectionMatrix(),Xe.setSize(window.innerWidth,window.innerHeight)});
