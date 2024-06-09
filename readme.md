
# 在 Render 上部署云粘贴板应用并添加自定义域名

本项目是一个简单的云粘贴板应用，使用 Flask 框架编写，可以通过 API 设置和获取粘贴板内容。在部署过程中，我们将应用部署到 Render，并添加自定义域名。

## 在 Render 上部署应用

### 步骤 1：准备项目文件

确保项目目录中包含以下文件：

- `app.py`：Flask 应用的主要代码文件。
- `requirements.txt`：包含应用所需的所有 Python 依赖包。
- `render.yaml`：用于指定 Render 服务配置的文件。

#### `app.py` 内容

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

clipboard = {}

@app.route('/clipboard/<name>', methods=['GET', 'POST'])
def handle_clipboard(name):
    if request.method == 'POST':
        content = request.json.get('content')
        clipboard[name] = content
        return jsonify({"message": "Content saved"}), 201
    elif request.method == 'GET':
        content = clipboard.get(name, '')
        return jsonify({"content": content})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
```

#### `requirements.txt` 内容

```plaintext
Flask==2.1.1
gunicorn==20.1.0
```

### 步骤 2：创建并更新 `render.yaml` 文件

在项目目录中创建 `render.yaml` 文件，并包含以下内容：

```yaml
services:
  - type: web
    name: cloud-clipboard
    env: python
    region: oregon
    plan: free
    buildCommand: "pip install -r requirements.txt"
    startCommand: "gunicorn app:app --bind 0.0.0.0:$PORT"
```

### 步骤 3：初始化 GitHub 仓库并推送代码

1. **初始化 Git 仓库**：

   在项目目录中打开终端（或命令提示符），然后运行以下命令初始化一个新的 Git 仓库：

   ```bash
   git init
   ```

2. **添加项目文件到 Git 仓库**：

   ```bash
   git add .
   ```

3. **提交初始代码**：

   ```bash
   git commit -m "Initial commit"
   ```

4. **创建 GitHub 仓库**：

   - 登录 [GitHub](https://github.com) 并创建一个新的仓库。
   - 记下仓库的 URL（例如 `https://github.com/yourusername/cloud_clipboard.git`）。

5. **将本地仓库连接到远程 GitHub 仓库**：

   ```bash
   git remote add origin https://github.com/yourusername/cloud_clipboard.git
   ```

6. **推送代码到 GitHub 仓库**：

   ```bash
   git push -u origin master
   ```

### 步骤 4：在 Render 上创建并配置 Web 服务

1. 登录 [Render](https://render.com) 并创建一个新的 Web 服务。
2. 连接到您的 GitHub 账户并选择刚刚创建的项目仓库。
3. Render 将根据 `render.yaml` 文件自动配置并部署您的应用。

### 步骤 5：测试部署

部署完成后，通过 Render 提供的 URL 进行测试。例如：

- **设置内容**：

  ```bash
  curl -X POST https://your-render-app.onrender.com/clipboard/myclip -H "Content-Type: application/json" -d '{"content":"Hello, World!"}'
  ```

- **获取内容**：

  ```bash
  curl https://your-render-app.onrender.com/clipboard/myclip
  ```

## 添加自定义域名

### 步骤 1：购买域名并添加 CNAME 记录

1. 购买您喜欢的域名（例如 `freecdn.shop`）。
2. 在您的 DNS 控制面板中添加一个 CNAME 记录，将您的子域名（例如 `cb`）指向您在 Render 上部署的应用的域名（例如 `your-render-app.onrender.com`）。

### 步骤 2：等待 DNS 记录生效

DNS 记录可能需要几分钟到几个小时的时间来生效。一旦生效，您就可以通过您的自定义域名访问您的应用了。

## 致谢

感谢您选择 Render 平台部署您的应用，并添加自定义域名。如果您有任何问题或需要进一步的帮助，请随时联系我们。
```

请将以上内容复制到 `README.md` 文件中，并将其包含在您的项目根目录中。如果您有任何其他问题或需要进一步的帮助，请随时告诉我！