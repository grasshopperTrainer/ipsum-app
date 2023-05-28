import os
import yaml
from flask import Flask


app = Flask(__name__)


@app.route("/api")
def hello_camping():
    return "hello camping!"


# config 파일을 불러와서 설정 값 적용시킴
# :param APP_PHASE: 앱 환경. README.md 참고할 것
#   e.g. run_dev, local_test, prod
APP_PHASE = os.environ.get("APP_PHASE", "run_dev")
config_file = f"config_{APP_PHASE}.yml"
config_path = f"{os.path.dirname(os.path.realpath(__file__))}/{config_file}"

with open(config_path) as f:
    config = yaml.load(f, yaml.FullLoader)
app.config.update(config)

if __name__ == "__main__":
    app.run()
