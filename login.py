from main import MainDashboard
from tkinter import *

loginPage = MainDashboard()
loginPage.title("Login Page")
loginPage.configure(bg="grey")

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

loginBtn = Button(loginPage, text='Login', bg='lightgrey', font=('Ariel', 15))
loginBtn.place(x=500, y=500)

loginPage.mainloop()