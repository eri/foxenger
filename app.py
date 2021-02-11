from flask import Flask, jsonify, request, redirect, render_template, session, send_from_directory
from urllib.parse import unquote
import datetime
import json
import os

# Définir notre application Flask
app = Flask(__name__)

### Fonctions de base

def get_users():
    """Permet de retourner tous les utilisateurs depuis la BDD"""
    with open('db/users.json') as f: return json.load(f)
def get_messages():
    """Permet de retourner tous les messages depuis la BDD"""
    with open('db/messages.json') as f: return json.load(f)
def get_user(id_user = False, name_user = False):
    """Permet de retourner un seul utilisateur depuis la BDD"""
    users = get_users()['users']
    for x in users:
        if id_user and int(x['id']) == id_user: return x
        if name_user and str(x['pseudo']) == name_user: return x
    return None
def get_message(id_msg):
    """Permet de retourner un seul message depuis la BDD"""
    msgs = get_messages()
    for x in msgs:
        if int(x['id']) == id_msg: return x
    return None
def get_emojis():
    return ['😀','😂','😉','😅','😜','🤔','😡','😬','😷','👍','👎']

## Routes HTML
@app.route("/")
def page_messagerie():

    if 'user_id' in session:
        # Déjà connecté, on montre les messages
        return render_template("messenger.html", **{
            'user':get_user(id_user=session.get('user_id')),
            'nb_msg':len(get_messages()['messages']), 'emojis':get_emojis() })

    # Utilisateur non enregistré
    return render_template("messenger.html", **{
            'user':get_users()['users'][-1], 'emojis':get_emojis(),
            'nb_msg': len(get_messages()['messages']) })

@app.route("/favicon.ico")
def favicon():
    """Retourne le favicon du site"""
    return send_from_directory(os.path.join(app.root_path, 'static'),
    'favicon.ico', mimetype='image/vnd.microsoft.icon')           

## Requêtes API
@app.route("/api/user/new/<user>/<pw>")
def add_users(user, pw):
    """Permet d'ajouter un utilisateur"""
    data = get_users()
    data['users'].append({"nom": str(user), "passe":str(pw)}) 
    with open('db/users.json', 'w') as f:
        json.dump(data, f)

@app.route("/api/message/new/<message>", methods=['GET', 'POST'])
def add_messages(message):
    """Permet de retourner tous les messages depuis la BDD"""
    data = get_messages()
    user = get_users()['users'][-1]
    data['messages'].append({"id": int(data['messages'][-1]['id'])+1, "id_membre":user['id'], "contenu":unquote(message), "date" : str(datetime.datetime.now())})
    with open('db/messages.json', 'w') as f:
        json.dump(data, f)
    return data['messages'][-1]['contenu'] # Retourne le dernier message

@app.route("/api/messages")
def list_messages():
    """Permet de retourner tous les messages de la BDD"""
    data = get_messages()['messages']
    html = ""
    for msg in data:
        date = msg['date'].split(' ')[0]
        heure = str(msg['date'].split(' ')[1].split('.')[0])[:5]
        timestamp = date if not str(datetime.datetime.now()).split(' ')[0] == date else heure
        user = get_users()['users'][-1]
        html += f"<div class='authorbox'>{user['pseudo']}: <div class='msgbox'>{msg['contenu']}</div><small>{timestamp}</small></div>"
    
    if not 'lastMsg' in session or not session['lastMsg'] == get_messages()['messages'][-1]['id']:
        # Session invalide ou nouveau message
        session['lastMsg'] = get_messages()['messages'][-1]['id']

    print(session['lastMsg'])
    return html


if __name__ == '__main__':
    app.secret_key = "X6DGXy9jGT6z8KjM3sAY"
    app.run(debug=True)