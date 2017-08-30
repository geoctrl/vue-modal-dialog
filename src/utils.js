export function DeferPromise() {
  let self = this;
  this.resCb = null;
  this.errCb = null;
  this.catchCb = null;

  this.resolve = data => {
    if (this.resCb) this.resCb(data);
  };

  this.reject = data => {
    if (this.errCb) this.errCb(data);
  };

  this.err = data => {
    if (this.catchCb) this.catchCb(data);
  };

  this.defer = {
    then(res=null, err=null) {
      self.resCb = res;
      self.errCb = err;
      return this;
    },
    catch(err=null) {
      self.catchCb = err;
    }
  };
}