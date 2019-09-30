function createPost(driver, origin, destination, date, time, seats, stops) {
    fetch('/posts',{
        method: 'POST',
        body: JSON.stringify({
            task: Array(driver, origin, destination, date, time, seats, stops)
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
    });
}