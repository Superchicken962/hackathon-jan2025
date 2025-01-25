import tkinter as tk
from tkinter import messagebox, ttk
from ttkbootstrap import Style
# from quiz_data import quiz_data

def check_answer():
    pass

# Main Window 
root = tk.tk()
root.title("Quiz App")
root.geometry("600x500")
style = Style(theme="flatly")

# Question Label
qs_label = ttk.Label(
    root,
    anchor="center",
    wraplength=500,
    padding=10,
)

qs_label.pack(pady=10)

# Choices
choice_btns = []

for choice in range(4):
    button = ttk.Button(
        root,
        command=lambda choice=choice: check_answer(choice)
    )
    button.pack(pady=5)
    choice_btns.append(button)

fb_label = ttk.label(
    root,
    anchor="center",
    padding=10
)
fb_label.pack(pady=10)