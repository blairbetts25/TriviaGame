$(document).ready(function () {
    // hides the answers before the game starts
    $(".btn-warning").hide();
    // hides the timer before the game starts
    $("#timer").hide();
    // hides the reset button 
    $("#resetButton").hide();
    // has the user selected an answer
    var userSelection = false;
    // the user guess for the question
    var userGuess;
    // index of the disney array
    var questionCount;
    // which question youre on
    var questionStatus;
    // is the timerValue running
    var timerRunning = false;
    // what the timerValue is set to ex 20 seconds 
    var timerValue;
    // variable to set the interval to
    var theTimer;
    // counter for the amount of quetions answered right
    var questionsCorrect;
    // counter for the questions answered wrong
    var questionsWrong;
    //Enum for the states of the game
    var correctNumber;
    const statesEnum = {
        startUpState: 0,
        questionState: 1,
        answerChoicesState: 2,
        checkAnswerState: 3,
        scoreboardState: 4

    };
    // //state
    var currentState = statesEnum.startUpState;
    //Array of object of the states of the game
    var stateRequirements = [
        // Start up State
        {
            timerRequired: false,
            timerlength: 0,
            questionVisable: false,
            answerChoicesVisable: false,
            correctAnswerVisable: false,
            timerVisable: false,
            resetButtonVisable: false
        },
        // quesiton State
        {
            timerRequired: true,
            timerlength: 2,
            questionVisable: true,
            answerChoicesVisable: false,
            correctAnswerVisable: false,
            timerVisable: false,
            resetButtonVisable: false
        },
        // Answer choices state
        {
            timerRequired: true,
            timerlength: 10,
            questionVisable: true,
            answerChoicesVisable: true,
            correctAnswerVisable: false,
            timerVisable: true,
            resetButtonVisable: false
        },
        // correct answer and comment state
        {
            timerRequired: true,
            timerlength: 5,
            questionVisable: true,
            answerChoicesVisable: false,
            correctAnswerVisable: true,
            timerVisable: false,
            resetButtonVisable: false
        },
        // scoreboard State
        {
            timerRequired: true,
            timerlength: 0,
            questionVisable: true,
            answerChoicesVisable: false,
            correctAnswerVisable: false,
            timerVisable: false,
            resetButtonVisable: true
        }
    ];
    // Array of objects containing the Question, Answer Choices, Index of the Correct Answer, and a Comment about the question
    var Disney = [
        {
            Question: "Who is Mickey in a relationship with?",
            correctAnswer: 1,
            choices: ["Daisy", "Minnie", "Cinderella", "Elsa"],
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
        currentState;
        questionCount = 0;
        questionStatus = 1;
        questionsCorrect = 0;
        questionsWrong = 0;
        displayQuestion();
    });
    //start funciton for timer
    function startTimer() {
        // lowering the timerValue
        timerValue = stateRequirements[currentState].timerlength;
        clearInterval(theTimer);
        theTimer = setInterval(runningTimer, 1000);
        $("#timer").html("<h2>" + timerValue + "</h2>");

    }
    // processing timer
    function runningTimer() {
        timerValue--;
        $("#timer").html("<h2>" + timerValue + "</h2>");
        if (userSelection || timerValue === 0) {
            clearInterval(theTimer);

            switch (currentState) {
                case statesEnum.questionState:
                    displayAnswers();
                    break;
                case statesEnum.answerChoicesState:
                    displayResult();
                    break;
                case statesEnum.checkAnswerState:
                    reviewResut();
                    break;
                case statesEnum.scoreboardState:
                    endOfGame();
                    break;
            };
        };
    }
    function uiDisplay() {
        // does the question need to be visable
        if (stateRequirements[currentState].questionVisable) {
            $("#question").show();
            $("#startMyGame").hide();
            $("#questionNumber").show();

        }
        else {
            $("#question").hide();
            $("#questionNumber").hide();
        };
        // does the tieer need to be visable
        if (stateRequirements[currentState].timerVisable) {
            $("#timer").show();
        }
        else {
            $("#timer").hide();
        };
        // do the answer choices need to be visable
        if (stateRequirements[currentState].answerChoicesVisable) {
            $(".btn-warning").show();
        }
        else {
            $(".btn-warning").hide();
        };
        // does the correct answer, right or wrong status, or comment need to be visableS
        if (stateRequirements[currentState].correctAnswerVisable) {
            $("#result").show();
            $("#status").show();
            $("#comment").show();
        }
        else {
            $("#result").hide();
            $("#status").hide();
            $("#comment").hide();
        };
        if (stateRequirements[currentState].resetButtonVisable) {
            $("#resetButton").show();
        }
        else {
            $("#resetButton").hide();
        };
    }
    // function to display the question
    function displayQuestion() {
        userSelection = false;
        currentState = statesEnum.questionState;
        //CALL FUNCTION HERE SET UI DISPLAY
        uiDisplay();
        // hide the start button
        $("#startMyGame").hide();
        $("#questionNumber").html("<h2>" + "Question " + questionStatus + "</h2>");
        $("h1").html("<h1>" + "Good Luck!" + "</h1>");
        // display the question
        $("#question").html("<h2>" + Disney[questionCount].Question + "</h2>")
        startTimer();

    };

    // function for displaying the answer choices
    function displayAnswers() {

        currentState = statesEnum.answerChoicesState;
        //CALL FUNCTION HERE SET UI DISPLAY
        uiDisplay();
        $(".game").html(("<h2>" + Disney[questionCount].Question + "</h2>"));
        $("#answer1").text(Disney[questionCount].choices[0]);
        $("#answer2").text(Disney[questionCount].choices[1]);
        $("#answer3").text(Disney[questionCount].choices[2]);
        $("#answer4").text(Disney[questionCount].choices[3]);
        startTimer();

    };
    // to do add the UI BUTTON so function can be called smoother
    $(".btn-warning").on("click", function userAnswer() {
        userGuess = $(this).data("disneydata")
        userSelection = true;
        correctNumber = parseInt(userGuess);
    });

    // function that displays the correct answer and the comment
    function displayResult() {

        currentState = statesEnum.checkAnswerState;

        //CALL FUNCTION HERE SET UI DISPLAY
        uiDisplay();
        $("#result").empty();
        $("#status").empty();
        $("#comment").empty();
        if (correctNumber === Disney[questionCount].correctAnswer) {
            $("#result").html(("<h2>" + Disney[questionCount].choices[correctNumber] + " is the Correct answer" + "</h2>"));
            $("#status").html("<h2>" + "YAY YOU GOT IT RIGHT" + ",</h2>");
            $("#status").css("background-color", "green");
            questionsCorrect++
        }
        else {
            $("#result").append(("<h2>" + "The correct answer is " + Disney[questionCount].choices[Disney[questionCount].correctAnswer] + "</h2>"));
            if (userSelection) {
                $("#result").append(("<h3>" + "This is what you picked " + Disney[questionCount].choices[correctNumber] + "</h3>"));
            } else {
                $("#result").append(("<h3> You didnt select an answer </h3>"));
            }
            $("#status").html("<h2>" + "OH NO YOU GOT IT WRONG" + "</h2>");
            $("#status").css("background-color", "red");
            questionsWrong++
        };
        $("#comment").html(("<h2>" + Disney[questionCount].comment + "</h2>"));

        userSelection = false;
        questionCount++;
        questionStatus++;
        startTimer();
        if (questionStatus === 11) {
            currentState = statesEnum.scoreboardState;
        }
    };
    function reviewResut() {
        displayQuestion();

    };
    function endOfGame() {
        $("#questionNumber").html("<h2>" + "You got " + questionsCorrect + " questions right" + "</h2>");
        $("#questionNumber").append("<h2>" + "You got " + questionsWrong + " questions wrong" + "</h2>");
        $("#question").html("<h2> Do you wish to play again? </h2>");
        $("h1").html("<h1>" + "Great Job!" + "</h1>");
        $("#resetButton").show();
        $("#timer").hide();
        $("#result").hide();
        $("#status").hide();
        $("#comment").hide();
    };

    $("#resetButton").on("click", function resetGame() {
        currentState = statesEnum.startUpState;
        $("#resetButton").hide();
        $("#timer").hide();
        $("#startMyGame").show();
        $("#result").hide();
        $("#status").hide();
        $("#comment").hide();
        $("#question").hide();
        $("#questionNumber").hide();
        $("h1").html("<h1>" + "Welcome To Disney Trivia" + "</h1>");
    });







});


