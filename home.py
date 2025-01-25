from main import MainDashboard
from tkinter import *

homePage = MainDashboard()
homePage.title("Home Page")

courseBtn = Button(homePage, text="Mathematics", font=("Ariel", 20), bg='lightgrey', fg='white')
courseBtn.pack()

homePage.mainloop()