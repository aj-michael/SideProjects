from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import os

PORT_NUMBER = 8002

class Handler(BaseHTTPRequestHandler):

  def do_GET(self):
    print self.client_address[0]
    self.send_response(200)
    self.send_header('Content-type','text/html')
    self.send_header('Access-Control-Allow-Origin', 'http://ajmichael.net')
    self.end_headers()
    self.wfile.write(self.client_address[0])
    return
     
if __name__ == '__main__':
  try:
    server = HTTPServer(('',PORT_NUMBER),Handler)
    print 'Started server on port ', PORT_NUMBER
    server.serve_forever()
  except KeyboardInterrupt:
    print '\nserver shutting down'
    server.socket.close()
