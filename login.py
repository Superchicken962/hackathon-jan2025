from main import MainDashboard
from tkinter import *
import requests

def login_req():
    URL = "https://hackathon.markgurney.dev/auth/login"
    BODY = {'username': userNameEntry.get(), 'password':passwordEntry.get()}
    r = requests.post(url = URL, json=BODY)
    data = r.json()

    errorLabel.config(text="")

    if 'error' in data:
        errorLabel.config(text=data['error']['message'])
        print(errorLabel)
        return
    
    # Get & store access token.
    access_token = data['access_token']

    file = open('access_token.txt', "a")
    file.write(access_token)

    # TODO: Change page
    errorLabel.config(text="Logged In!")


loginPage = MainDashboard()
loginPage.title("Login Page")

global errorLabel 
errorLabel = Label(loginPage, text='', bg='grey', fg='white', font=("Ariel", 15))
errorLabel.pack()

title = Label(loginPage, text='Login Page', bg='grey', fg='white', font=("Ariel", 26))
title.pack(pady=20)

userName = Label(loginPage, text='Username :', font=('Ariel', 20), fg='black')
userName.place(x=310, y=190)

password = Label(loginPage, text='Password :', font=('Ariel', 20), fg='black')
password.place(x=310, y=240)

userNameEntry = Entry(loginPage, font=('Ariel', 20))
userNameEntry.place(x=500, y=190)

passwordEntry = Entry(loginPage, font=('Ariel', 20), show='*')
passwordEntry.place(x=500, y=240)

loginBtn = Button(loginPage, text='Login', bg='lightgrey', font=('Ariel', 15), command=lambda: login_req())
loginBtn.place(x=500, y=500)


loginPage.mainloop()