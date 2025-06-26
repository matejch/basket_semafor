// function init_commands(){
//     team_a_3p_div = document.getElementById('team_a_3')
//     team_a_2p_div = document.getElementById('team_a_2')
//     team_a_1p_div = document.getElementById('team_a_1')
//     team_a_0p_div = document.getElementById('team_a_0') //reduce points
//
//     team_b_3p_div = document.getElementById('team_b_3')
//     team_b_2p_div = document.getElementById('team_b_2')
//     team_b_1p_div = document.getElementById('team_b_1')
//     team_b_0p_div = document.getElementById('team_b_0') //reduce points
//
//     team_a_timeouts_div = document.getElementById('team_a_3')
//     team_a_fouls_div = document.getElementById('team_a_3')
//     team_b_timeouts_div = document.getElementById('team_a_3')
//     team_b_fouls_div = document.getElementById('team_a_3')
//
//     team_a_score = document.getElementById('box_team_a_score')
//     team_b_score = document.getElementById('box_team_b_score')
//
//     function score_helper(pts, element) {
//         val = element.innerText
//         new_score = parseInt(val) + pts
//         console.log(new_score)
//         if (new_score < 0) {
//             new_score = 0
//         }
//         element.innerText = new_score
//     }
//
//     function foul_helper(pts, element) {
//         val = element.innerText
//         new_score = parseInt(val) + pts
//         console.log(new_score)
//         if (new_score < 0) {
//             new_score = 0
//         }
//         if (new_score > 3) {
//             new_score="BONUS"
//             element.innerText = new_score
//             element.background
//         }
//
//     }
//
//     function team_a_3point() {
//         score_helper(3, team_a_score)
//         return false
//     }
//     function team_a_2point() {
//         score_helper(2, team_a_score)
//         return false
//     }
//     function team_a_1point() {
//         score_helper(1, team_a_score)
//         return false
//     }
//     function team_a_0point() {
//         score_helper(-1, team_a_score)
//         return false
//     }
//     function team_b_3point() {
//         score_helper(3, team_b_score)
//         return false
//     }
//     function team_b_2point() {
//         score_helper(2, team_b_score)
//         return false
//     }
//     function team_b_1point() {
//         score_helper(1, team_b_score)
//         return false
//     }
//     function team_b_0point() {
//         score_helper(-1, team_b_score)
//         return false
//     }
//
//     team_a_3p_div.onclick = team_a_3point;
//     team_a_2p_div.onclick = team_a_2point;
//     team_a_1p_div.onclick = team_a_1point;
//     team_a_0p_div.onclick = team_a_0point;
//     team_b_3p_div.onclick = team_b_3point;
//     team_b_2p_div.onclick = team_b_2point;
//     team_b_1p_div.onclick = team_b_1point;
//     team_b_0p_div.onclick = team_b_0point;
//
//
//
// }
//
// console.log("loaded")
// function addOnload(fun){
//     var last = window.onload;
//     window.onload = function(){
//         if(last) last();
//         fun();
//     }
// }
//
// addOnload(init_commands)
//
