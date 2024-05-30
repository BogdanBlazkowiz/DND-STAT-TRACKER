import subprocess
import webbrowser
subprocess.Popen(['python', '-m', 'http.server', '8000'])
webbrowser.open_new_tab('http://localhost:8000/indexPlayer.html')
