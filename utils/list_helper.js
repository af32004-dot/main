const dummy = (blogs) => {

return blogs.length === 0
    ? 0
    : blogs.reduce((sum, elem) => sum + elem.likes, 0) 
}


const favourite = (blogs) => {

let mx = 0
for (let i=0; i<blogs.length; i++) if(blogs[i].likes>mx) mx=blogs[i].likes 

return blogs.length === 0
    ? 0
    : blogs.filter(note => note.likes === mx) 
}


const mostblogs = (blg) => {
let mx = 0
let tipo= [{}]
let cnd=-1

const ist = (nm)=>{
  for (let j=0; j<tipo.length; j++)    if (tipo[j].author===nm) return j
  return -1
}

for (let i=0; i<blg.length; i++) 
{
let k=0  
cnd=ist(blg[i].author)
if(cnd===-1){ 
  const nv = {
    author: blg[i].author,
    blogs: 1
   }
  tipo.push(nv)
} else {
  tipo[cnd].blogs++
}}

for (let i=0; i<tipo.length; i++) if(tipo[i].blogs>mx) mx=tipo[i].blogs

const tp = tipo.filter(note => note.blogs === mx)

return tp

}

const mostlikes = (blg) => {
let mx = 0
let tipo= [{}]
let cnd=-1

const ist = (nm)=>{
  for (let j=0; j<tipo.length; j++)    if (tipo[j].author===nm) return j
  return -1
}

for (let i=0; i<blg.length; i++) 
{
let k=0  
cnd=ist(blg[i].author)
if(cnd===-1){ 
  const nv = {
    author: blg[i].author,
    likes: blg[i].likes
   }
  tipo.push(nv)
} else {
  tipo[cnd].likes=tipo[cnd].likes+blg[i].likes
}}

for (let i=0; i<tipo.length; i++) if(tipo[i].likes>mx) mx=tipo[i].likes

const tp = tipo.filter(note => note.likes === mx)

return tp

}

module.exports = {  dummy , favourite, mostblogs, mostlikes }