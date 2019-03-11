$(document).ready(function () {
    // has the user selected an answer
    var userSelection = false;
    // the user guess for the question
    var userGuess;
    // index of the disney array
    var questionCount = 0;
    // what the timerValue is set to ex 20 seconds 
    var timerValue;
    // is the timerValue running
    var timerRunning = false;
    // variable to set the interval to
    var theTimer;
    // array of objects which includes the questions, correct answer, the possible choices, and a comment about the answer
    var Disney = [
        {
            Question: "Who is Mickey in a relationship with?",
            correctAnswer: 1,
            choices: ["Daisey", "Minney", "Cinderella", "Elsa"],
            comment: "Don't you just love a nice romantic couple"

        },
        {
            Question: "In what year did Disney World 'Florida' open?",
            correctAnswer: 2,
            choices: ["1969", "1970", "1971", "1972"],
            comment: "Walt Disney helped with desgin but unfortunatly never got to see it open"

        },
        {
            Question: "What is the name of Mickey's dog?",
            correctAnswer: 3,
            choices: ["Goofy", "Donald", "Dale", "Pluto"],
            comment: "Who doesn't love mans best friend or in this case mouses best friend"

        },
        {
            Question: "In 1971 Disney's Magic Kingdom openend with 19 attractions, how many are still around today?",
            correctAnswer: 0,
            choices: ["13", "14", "15", "16"],
            comment: "They are: The Haunted Mansion, Dumbo the Flying Elephant, Cinderella's Golden Carosel, It's a Small World, Jungle Cruise, Mad Tea Party aka The Tea Cups, Tomorrowland Raceway 'May not be around for much longer', Country Bear Jamboree, Hall of Presidents, Frontierland Shootin Gallery, Swiss Family Treehouse, and The Enchanted Tiki Room"

        },
        {
            Question: "What is the name of the new section being added to Disney's Hollywood Studios projecting to open this fall?",
            correctAnswer: 1,
            choices: ["Toy Story Land", "Galaxy's Edge", "Pirates Adventure", "Wakanda"],
            comment: "This is the spot for the new STAR WARS land. There is plans for a STAR WARS themed hotel to be opened up soon as well but they havent given a release date"

        },
        {
            Question: "What was The Walt Disney Compnay's first movie?",
            correctAnswer: 2,
            choices: ["Cinderella", "The Little Mermaid", "Snow White and the Seven Dwarfs", "Pinocchio"],
            comment: "Snow White and the Seven Dwarfs came out on January 13, 1938"

        },
        {
            Question: "Which Disney movie has won the most awards?",
            correctAnswer: 2,
            choices: ["Who Framed Roger Rabbit", "The Lion King", "Mary Poppins", "Frozen"],
            comment: "Mary Poppins won a bafaling 5 awards including: Best Actress and Actor, Best Origonal Music, and Best Written American Musical just to name a few. "

        },
        {
            Question: "How many movies is The Walt Disney Company releasing in the year 2019?",
            correctAnswer: 3,
            choices: ["5", "8", "15", "11"],
            comment: "The movies are: Captain Marvel, Avengers Endgame, Aladdin, Penguins, Dumbo, The Lion King, Toy Story 4, Artemis Fowl, Maleficent: Mistress of Evil, Frozen 2, and last but certainly not least STAR WARS: Episode IX"

        },
        {
            Question: "How many Disney films have been made into Broadway productions?",
            correctAnswer: 1,
            choices: ["7", "8", "9", "10"],
            comment: "They are: Beauty and the Beast, The Lion King, Tarzan, Mary Poppins, Newsies, The Little Mermaid, Aladdin and Frozen"

        },
        {
            Question: "How many Disney films have no human characters in them?",
            correctAnswer: 3,
            choices: ["6", "7", "8", "9"],
            comment: "They are: Bambi, Robin Hood, The Lion King, A Bug's Life, Dinosaur, Cars, Cars 2, Cars 3, and Zootopia"

        }

    ]
    $("#startMyGame").on("click", function startMyGame() {
        displayQuestion();

    });

    function decrement() {
        // lowering the timerValue
        timerValue--
        // display the timerValue
        $("#timer").html("<h2>" + timerValue + "</h2>");
        if (timerValue === 0) {
            clearInterval(theTimer);
            $("#answer").empty();
            $("#answer").show();
            timerRunning = false;
            if (!userSelection)
                displayAnswers();
        }
    }
    function displayQuestion() {
        // hide the start button
        $("#startMyGame").hide();
        $("h1").html("<h1>" + "Good Luck!" + "</h1>");
        // display the question
        $("#question").html("<h2>" + Disney[questionCount].Question + "</h2>")
        // if the question count is lower that the length of the Disney array minus 1 then display the quesiton
        // if (questionCount < Disney.length - 1) {
        // if the timerValue is not running
        if (!timerRunning) {
            timerRunning = true;
            timerValue = 1;
            clearInterval(theTimer);
            // set a interval to 1 second and take one second away from the timerValue
            theTimer = setInterval(decrement, 1000);
        }
        // }
    };
    function decrementAnswer() {
        // lowering the timerValue
        timerValue--
        // display the timerValue
        $("#timer").html("<h2>" + timerValue + "</h2>");
        if (timerValue === 0) {
            clearInterval(theTimer);
            timerRunning = false;
            alert("OH NO youve run out of time")
            displayCorrectAnswer();

        }
    }

    function displayAnswers() {
        $(".game").html(("<h2>" + Disney[questionCount].Question + "</h2>"))
        $("#answer").append('<button data-DisneyData="' + 0 + '">' + Disney[questionCount].choices[0] + "</button>");
        $("#answer").append('<button data-DisneyData="' + 1 + '">' + Disney[questionCount].choices[1] + "</button>");
        $("#answer").append('<button data-DisneyData="' + 2 + '">' + Disney[questionCount].choices[2] + "</button>");
        $("#answer").append('<button data-DisneyData="' + 3 + '">' + Disney[questionCount].choices[3] + "</button>");


        if (!timerRunning) {
            timerRunning = true;
            timerValue = 5;
            clearInterval(theTimer)
            theTimer = setInterval(decrementAnswer, 1000)
            if (!userSelection) {
                $("button").on("click", function userAnswer() {
                    userGuess = this.getAttribute("data-DisneyData");
                    userSelection = true;
                    displayCorrectAnswer();
                    clearInterval(decrementAnswer);
                    timerRunning = false;
                })
            }



        }
    };

    function decrementCorrectAnswer() {
        // lowering the timerValue
        timerValue--
        // display the timerValue
        $("#timer").html("<h2>" + timerValue + "</h2>");
        if (timerValue === 0) {
            clearInterval(theTimer);
            timerRunning = false;
            $("#answer").hide();
            $("#comment").hide();
            questionCount++
            displayQuestion();

        };
    };


    function displayCorrectAnswer() {
        if (userGuess === Disney.correctAnswer) {
            $("#result").html(("<h2>" + userGuess + "</h2>"));
            $("#status").html("<h2>" + "YAY YOU GOT IT RIGHT" + ",</h2>");
            $("#comment").html(("<h2>" + Disney[questionCount].comment + "</h2>"));
            $("#comment").show();
            if (!timerRunning) {
                timerRunning = true;
                timerValue = 5;
                clearInterval(theTimer)
                theTimer = setInterval(decrementCorrectAnswer, 1000)
            }

        } else {
            var correctNumber = parseInt(userGuess);
            $("#result").append(("<h2>" + "The correct answer is " + Disney[questionCount].choices[Disney[questionCount].correctAnswer] + "</h2>"));
            $("#result").append(("<h3>" + "This is what you picked" + Disney[questionCount].choices[correctNumber] + "</h3>"));
            $("#status").html("<h2>" + "OH NO YOU GOT IT WRONG" + ",</h2>");
            $("#comment").html(("<h2>" + Disney[questionCount].comment + "</h2>"));
            $("#comment").show();
            if (!timerRunning) {
                timerRunning = true;
                timerValue = 5;
                clearInterval(theTimer)
                theTimer = setInterval(decrementCorrectAnswer, 1000)
            }
        }
    }








});