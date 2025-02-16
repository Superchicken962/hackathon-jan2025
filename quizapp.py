from tkinter import *
from tkinter import messagebox as mb
import json
import time 
import requests

class Quiz:

    def __init__(self):

        # set question number to 0
        self.q_no=0

         # assigns ques to the display_question function to update later.
        self.display_title()
        self.display_question()

        # opt_selected holds an integer value which is used for
        # selected option in a question.
        self.opt_selected=IntVar()

        # displaying radio button for the current question 
        self.opts=self.radio_buttons()
        
        # display options for the current question
        self.display_options()

        # displays the button for next and exit.
        self.buttons()
        
        # no of questions
        self.data_size=len(question)
        
        # keep a counter of correct answers
        self.correct=0

        # initialize time
        self.starting_time = time.time()

        # display timer label
        self.timer_label = Label(gui, text="Time: 0s", font=("ariel", 14))
        self.timer_label.place(x=700, y=400)

        # start updating the timer
        self.update_timer()

    # Function to update timer
    def update_timer(self):
        elapsed_time = int(time.time() - self.starting_time)
            # Update the text of the timer label
        self.timer_label.config(text=f"Time: {elapsed_time}s")
        gui.after(1000, self.update_timer)
    # This method is used to display the result
    # It counts the number of correct and wrong answers
    # and then display them at the end as a message Box

    def display_result(self):
        
        # calculates the wrong count
        wrong_count = self.data_size - self.correct
        correct = f"Correct: {self.correct}"
        wrong = f"Wrong: {wrong_count}"
        
        # calculates the percentage of correct answers
        score = int(self.correct / self.data_size * 100)
        result = f"Score: {score}%"
        ttime = int(time.time() - self.starting_time)
        finaltime = f"Duration: {ttime} seconds"
        # Shows a message box to display the result
        mb.showinfo("Result", f"{result}\n{correct}\n{wrong}\n{finaltime}")

     # This method checks the Answer after we click on Next.
    def check_ans(self, q_no):
        
        # checks for if the selected option is correct
        if self.opt_selected.get() == answer[q_no]:
            # if the option is correct it return true
            return True
        
    # This method is used to check the answer of the
    # current question by calling the check_ans and question no.
    def next_btn(self):
        
        # Check if the answer is correct
        if self.check_ans(self.q_no):
            
            # if the answer is correct it increments the correct by 1
            self.correct += 1
        
        # Moves to next Question by incrementing the q_no counter
        self.q_no += 1
        
        # checks if the q_no size is equal to the data size
        if self.q_no==self.data_size:
            
            # if it is correct then it displays the score
            self.display_result()
            
            # destroys the GUI
            gui.destroy()
        else:
            # shows the next question
            self.display_question()
            self.display_options()
            
    # This method shows the two buttons on the screen.
    def buttons(self):
        
        # The first button is the Next button to move to the
        # next Question
        next_button = Button(gui, text="Next",command=self.next_btn,
        width=10,bg="blue",fg="white",font=("ariel",16,"bold"))
        
        # placing the button  on the screen
        next_button.place(x=350,y=380)
        
        # This is the second button which is used to Quit the GUI
        quit_button = Button(gui, text="Quit", command=gui.destroy,
        width=5,bg="black", fg="white",font=("ariel",16," bold"))
        
        # placing the Quit button on the screen
        quit_button.place(x=700,y=50)

    # This method deselect the radio button on the screen
    def display_options(self):
        val=0
        
        # deselecting the options
        self.opt_selected.set(0)
        
        # looping over the options to be displayed for the
        # text of the radio buttons.
        for option in options[self.q_no]:
            self.opts[val]['text']=option
            val+=1

     # This method shows the current Question on the screen
    def display_question(self):
        
        # setting the Question properties
        q_no = Label(gui, text=question[self.q_no], width=60,
        font=( 'ariel' ,16, 'bold' ), anchor= 'w' )
        
        #placing the question on the screen
        q_no.place(x=70, y=100)
    # This method is used to Display Title
    def display_title(self):
        
        # The title to be shown
        title = Label(gui, text="Study Assistance QUIZ",
        width=50, bg="blue",fg="white", font=("ariel", 20, "bold"))
        
        # place of the title
        title.place(x=0, y=2)
    # This method shows the radio buttons to select the Question
    # on the screen at the specified position. It also returns a
    # list of radio button which are later used to add the options to
    # them.
    def radio_buttons(self):
        
        # initialize the list with an empty list of options
        q_list = []
        
        # position of the first option
        y_pos = 150
        
        # adding the options to the list
        while len(q_list) < 4:
            
            # setting the radio button properties
            radio_btn = Radiobutton(gui,text=" ",variable=self.opt_selected,
            value = len(q_list)+1,font = ("ariel",14))
            
            # adding the button to the list
            q_list.append(radio_btn)
            
            # placing the button
            radio_btn.place(x = 100, y = y_pos)
            
            # incrementing the y-axis position by 40
            y_pos += 40
        
        # return the radio buttons
        return q_list
    
# Create a GUI Window
gui = Tk()

# set the size of the GUI Window
gui.geometry("800x450")

# set the title of the Window
gui.title("Study Assistance Quiz")

access_token = None

# get the data from the json file
try:
    with open('access_token.txt') as f:
        access_token = json.load(f)
except:
    access_token = ""

URL = "https://hackathon.markgurney.dev/quiz/1/questions"
cookies = {'access_token': access_token}

r = requests.get(url = URL, cookies=cookies)
data = r.json()

if 'error' in data:
    print("Error getting questions", data['error'])

# set the question, options, and answer
question = (data['questions'])
options = (data['options'])
answer = (data[ 'answers'])

# create an object of the Quiz Class.
quiz = Quiz()

# Start the GUI
gui.mainloop()