document.getElementsByName("anonymous")[0].addEventListener("click",() => {
  document.querySelector(".Checked_Anon").style.display = ["none","block"][Number(document.getElementsByName("anonymous")[0].checked)]
});
function sendData(){
qs=document.querySelector;
fetch("/new", {
            method: "POST",
            body: JSON.stringify({
              v1:document.querySelector(".r1").value,
              v2:document.querySelector(".r2").value,
              anonymous: document.getElementsByName("anonymous")[0].checked,
              anon_name: document.querySelector(".Anonymous_name").value
            }),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(res => res.text()).then(result => {
            console.log(result);
        });
  location.href = '/'
}
document.querySelector(".submit").addEventListener("click",sendData);
let notifications = [];
function notify(text){
  let k = notifications.length * 1
  const ele = document.createElement("div");
  ele.className = "notification"
  ele.innerHTML = text;
  ele.style.top = `${notifications.length * 100 + 40}px`;
  ele.style.right = `-30px`; // 55
  ele.right = -30
  let i = setInterval(()=>{
    ele.right += (25 - ele.right)/5;
    ele.style.right = `${ele.right}px`;
    if (ele.right == 25){
      clearInterval(i)
    }
  }, 5);
  ele.addEventListener("click",()=>{
    ele.remove();
    notifications.splice(notifications.indexOf(ele), 1);
  })
  const timer = document.createElement("div");
  timer.className = "timer_notify";
  timer.width = 100;
  ele.appendChild(timer);
  let I = setInterval(()=>{
    if(timer.width < 0){
      clearInterval(I);
      ele.remove();
      notifications.splice(notifications.indexOf(ele), 1);
    }
    timer.width -= 0.5;
    ele.style.top = `${notifications.indexOf(ele) * 100 + 40}px`;
    timer.style.width = timer.width + "%"
  },15)
  document.body.appendChild(ele);
  notifications.push(ele);
}
setTimeout(()=>notify("Click on any of the buttons to start."),1000)

let menu = document.querySelector(".menu"), opened = false;
function openMenu(){
  opened = true
  document.querySelector('.menu').classList.add('menuopen');
  document.querySelectorAll('.b').forEach(e => e.style.opacity = 1)
}
function closeMenu(){
  opened = false
  document.querySelector('.menu').classList.remove('menuopen');
  document.querySelectorAll('.b').forEach(e => e.style.opacity = "0")
}
function toggle(){
  if(opened){ closeMenu() }
  else { openMenu() }
}
menu.addEventListener("mouseover",toggle);
menu.addEventListener("mouseout",toggle);
document.querySelector(".b1").addEventListener('click',()=>{ location.href = "/new" });
document.querySelector(".b2").addEventListener('click',()=>{ location.href = "/gallery" });
document.querySelector(".b3").addEventListener('click',()=>{ location.href = "/" });