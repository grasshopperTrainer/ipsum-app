from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_camping():
    return 'hello camping'
    
if __name__ == '__main__':
    import os
    import yaml

    # config 파일을 불러와서 설정 값 적용시킴
    # :param app_env: 앱 환경. README.md 참고할 것
    #   e.g. run_dev, local_test, prod
    app_env = os.environ.get('APP_ENV', 'run_dev')
    config_file = f'config_{app_env}.yml'
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(f'{dir_path}/{config_file}') as f:
        config = yaml.load(f, yaml.FullLoader)
    app.config.update(config)
    
    app.run(host=config['HOST'], port=config['PORT'])