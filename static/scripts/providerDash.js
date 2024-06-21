const services = [
    {name: "Web Dev", price: 50, overall_Rate: 4.2, timeCreated: "4", totalRev: 250},
    {name: "Logo design", price: 10, overall_Rate: 4.3, timeCreated: "10", totalRev: 110},
    {name: "graphic design", price: 25, overall_Rate: 4.6, timeCreated: "1", totalRev: 75}
]

function getMostRevenue(){
    let mostRev=0;
    let mostRevService;
    services.forEach(service=>{
        if(service.totalRev>mostRev){
            mostRevService = service;
            mostRev = service.totalRev;
        }
    })
    return mostRevService;
}

window.addEventListener('DOMContentLoaded',function(){
    let totalRev=0;
    console.log(services[0].price);
    if(services.length === 0){
        this.document.getElementById("dash-services").innerHTML = "<h2>No Jobs created, <a href=#>Create a new Job!<a></h2>"
    }
    else{
        services.forEach(service => {
            totalRev+=service.totalRev;
            this.document.getElementById("dash-services").innerHTML += `
            <div class=\"service-card\"> 
                <h2>${service.name}</h2>
                <h4>For ${service.price}$ / order</h4>
                <p>Total income: ${service.totalRev} $</p>
                <p>Overall rating: ${service.overall_Rate}</p>
                <h6>created ${service.timeCreated} days ago</h6>

            </div>

            `

        });
        /*const button = document.createElement('button');
        button.textContent = 'Create New Service NOW!';
        button.onclick = function() {
        window.location.href = '/newgig';
        };
        document.getElementById("dash-services").appendChild(button);
        */
        
    }
    let mostProfitableService = getMostRevenue();
    this.document.getElementById("dash-statistics").innerHTML = `
    <h2> Total Revenue Made: ${totalRev} $<h2>
    <h3>Most profitable Service:</h3>
    <h4>Service Name: ${mostProfitableService.name}<h4>
    <h4>Total Profit: ${mostProfitableService.totalRev}$ / ${mostProfitableService.timeCreated} days<h4>
    `

});