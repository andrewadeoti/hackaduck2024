from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///time_tracking.db'
db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    leave_balance = db.Column(db.Integer, default=0)  # Placeholder for absence management data

    def __repr__(self):
        return f'<User {self.username}>'

# TimeEntry model for tracking time entries
class TimeEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    clock_in = db.Column(db.DateTime, nullable=False)
    clock_out = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<TimeEntry for user {self.user_id}>'

# Route for user registration
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return render_template('register.html', error='Username already exists')

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create a new user and add to the database
        new_user = User(username=username, password=hashed_password, leave_balance=0)
        db.session.add(new_user)
        db.session.commit()

        # Redirect to login page
        return redirect(url_for('login'))

    return render_template('register.html')

# Route for user login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Fetch the user and verify password
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error='Invalid username or password')

    return render_template('login.html')

# Dashboard route
@app.route('/dashboard')
def dashboard():
    # This page would show options for time tracking, absence management, etc.
    return render_template('dashboard.html')

# Placeholder route for absence management
@app.route('/absence_management')
def absence_management():
    # Logic for managing user absences (e.g., request leave, view leave history)
    return render_template('absence_management.html')

# Placeholder route for payroll
@app.route('/payroll')
def payroll():
    # Logic to calculate payroll, generate reports, and integrate with payroll systems
    return render_template('payroll.html')

if __name__ == '__main__':
    app.run(debug=True)
