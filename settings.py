 #<!setting.py-->
from flask import Flask, render_template, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

app = Flask(__name__)
app.secret_key = "your_secret_key"

@app.route('/settings')
def settings():
    # Check if user is logged in
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user_id = session['user_id']
    user = User.query.get(user_id)
    

    return render_template('settings.html', username=user.username, password=user.password)
