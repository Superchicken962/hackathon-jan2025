from tkinter import *
from ttkbootstrap import Style

class MainDashboard(Tk):
    def __init__(self):
        super().__init__()
        self.title("Quiz App")
        self.geometry('1200x1080')
        self.minsize(600, 600)
        self.maxsize(1200, 1080)
        self.configure(bg='lightblue')