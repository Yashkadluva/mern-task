import axios from "axios";
import { toast } from "react-toastify";

interface PropData {
  action: string;
  body?: any;
  isFormData?: boolean;
  isShowError?: boolean;
  id?: string;
  type?: string;
  key?: string;
  file?: any;
}

const WebService = {
  postAPI: function (props: PropData) {
    // this.addLoader(props.id);
    let url = this.getBaseUrl()
    return new Promise((resolve, reject) => {
      var bodyFormData = new URLSearchParams();
      for (let key in props.body) {
        bodyFormData.append(key, props.body[key]);
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .post(
          `${url}${props.action}`,
          props.isFormData ? bodyFormData : props.body,
          {
            headers: headers,
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error && error.response && error.response.status == 401) {
            localStorage.clear();
            window.location.href = "/login";
          }
          toast.error(error?.response?.data?.message)
          props.isShowError ? reject(this.errorHandler(error)) : reject(error);
        });
    });
  },

  fileUploadAPI: function (props: PropData) {
    var formData = new FormData();
    if (!props.key) {
      props.key = "file";
    }
    formData.append(props.key, props.file);
    for (let key in props.body) {
      formData.append(key, props.body[key]);
    }
    this.addLoader(props?.id);
    let url = this.getBaseUrl();
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}${props.action}`, formData, {
          headers: this.getMultipartHeaders(),
        })
        .then((response) => {
          resolve(response.data);
          this.removeLoader(props?.id);
        })
        .catch((error) => {
          // props.isShowError ? reject(this.errorHandler(error)) : reject(error);
          this.errorHandler(error);
          this.removeLoader(props?.id);
        });
    });
  },

  getMultipartHeaders: function () {
    if (typeof window !== 'undefined') {
      return {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      };
    }
  },

  getAPI: function (props: PropData) {
    let url = this.getBaseUrl()
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .get(`${url}${props.action}`, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error && error.response && error.response.status == 401) {
            localStorage.clear();
            window.location.href = "/login";
          }
          props.isShowError ? reject(this.errorHandler(error)) : reject(error);
        });
    });
  },

  deleteAPI: function (props: PropData) {
    let url = this.getBaseUrl()
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .delete(`${url}${props.action}`, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error && error.response && error.response.status == 401) {
            localStorage.clear();
            window.location.href = "/login";
          }
          props.isShowError ? reject(this.errorHandler(error)) : reject(error);
        });
    });
  },

  errorHandler: function (error: any) {

    if (error?.response) {
      error = error.response;
    }
    var errorMessage;
    if (!error || !error.status) {
      errorMessage = "Server Not Responding";
    } else if (error.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    toast.error(errorMessage);
    return errorMessage;
  },

  addLoader(id: any) {
    if (id) {
      var button = document.getElementById(id) as HTMLButtonElement | null;
      if (button != null) {
        button.disabled = true;
        var loader = document.createElement("i");
        loader.className = "bi bi-arrow-repeat mr-2";
        button.prepend(loader);
      }
    }
  },

  removeLoader(id: any) {
    if (id) {
      var button = document.getElementById(id) as HTMLButtonElement | null;
      if (button != null) {
        button.disabled = false;
        button.removeChild(button.childNodes[0]);
      }
    }
  },

  getBaseUrl() {
    return "http://localhost:3030/";
  }
};

export default WebService;
